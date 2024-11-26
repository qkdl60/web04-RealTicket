import { RedisService } from '@liaoliaots/nestjs-redis';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { DataSource, In, QueryRunner } from 'typeorm';

import { UserParamDto } from 'src/util/user-injection/userParamDto';

import { AuthService } from '../../../auth/service/auth.service';
import { InBookingService } from '../../booking/service/in-booking.service';
import { Event } from '../../event/entity/event.entity';
import { Place } from '../../place/entity/place.entity';
import { Section } from '../../place/entity/section.entity';
import { Program } from '../../program/entities/program.entity';
import { ReservationCreateDto } from '../dto/reservationCreateDto';
import { ReservationIdDto } from '../dto/reservationIdDto';
import { ReservationSeatInfoDto } from '../dto/reservationSeatInfoDto';
import { ReservationSpecificDto } from '../dto/reservationSepecificDto';
import { Reservation } from '../entity/reservation.entity';
import { ReservedSeat } from '../entity/reservedSeat.entity';
import { ReservationRepository } from '../repository/reservation.repository';

@Injectable()
export class ReservationService {
  private redis: Redis;
  private logger: Logger = new Logger(ReservationService.name);

  constructor(
    @Inject() private readonly reservationRepository: ReservationRepository,
    @Inject() private readonly redisService: RedisService,
    @Inject() private readonly dataSource: DataSource,
    @Inject() private readonly authService: AuthService,
    @Inject() private readonly inBookingService: InBookingService,
  ) {
    this.redis = this.redisService.getOrThrow();
  }

  async findUserReservation({ id }: UserParamDto) {
    const reservations: Reservation[] =
      await this.reservationRepository.selectAllReservationAfterNowByUserWithAll(id);
    return await this.convertReservationListToSpecificDto(reservations);
  }

  private async convertReservationListToSpecificDto(
    reservations: Reservation[],
  ): Promise<ReservationSpecificDto[]> {
    return Promise.all(
      reservations.map(async (reservation: Reservation) => {
        const [program, event, reservedSeats] = await Promise.all([
          reservation.program,
          reservation.event,
          reservation.reservedSeats,
        ]);
        const place = await program.place;

        return new ReservationSpecificDto({
          id: reservation.id,
          programName: program.name,
          runningDate: event.runningDate,
          placeName: place.name,
          seats: this.makeStringFormatFromReservedSeats(reservedSeats),
        });
      }),
    );
  }

  private makeStringFormatFromReservedSeats(reservedSeats: ReservedSeat[]) {
    return reservedSeats
      .map((seat) => {
        return `${seat.section}구역 ${seat.row}행 ${seat.col}열`;
      })
      .join(', ');
  }

  async deleteReservation({ id }: UserParamDto, { reservationId }: ReservationIdDto) {
    const result = await this.reservationRepository.deleteReservationByIdMatchedUserId(id, reservationId);
    if (!result.affected)
      throw new BadRequestException(`사용자의 해당 예매 내역[${reservationId}]가 존재하지 않습니다.`);
  }

  validateReservationLength(seats: ReservationSeatInfoDto[]) {
    return seats.length < 0 || seats.length > 4;
  }

  async recordReservationTransaction(reservationCreateDto: ReservationCreateDto, sid: string) {
    const queryRunner = this.dataSource.createQueryRunner();

    if (this.validateReservationLength(reservationCreateDto.seats)) {
      throw new BadRequestException('예매 가능한 좌석 수는 1~4개 입니다.');
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const session = await this.authService.getUserSession(sid);
      const userId = session.id;
      const eventId = await this.authService.getUserEventTarget(sid);
      const bookingAmount = await this.inBookingService.getBookingAmount(sid);

      if (reservationCreateDto.eventId !== eventId || reservationCreateDto.seats.length !== bookingAmount) {
        throw new BadRequestException('예매 정보 또는 설정한 좌석수가 올바르지 않습니다.');
      }

      const { event, program, place } = await this.getEventDetail(queryRunner, reservationCreateDto.eventId);

      const reservationResult = await this.saveReservation(
        queryRunner,
        reservationCreateDto,
        userId,
        event,
        program,
      );

      const reservedSeatsInfo = await this.savedReservedSeat(
        queryRunner,
        reservationCreateDto,
        place,
        event,
        reservationResult,
      );

      await queryRunner.commitTransaction();

      return {
        programName: program.name,
        runningDate: event[0].runningDate,
        placeName: place.name,
        price: program.price,
        seats: reservedSeatsInfo.map((seat) => {
          return `${seat.section}구역 ${seat.row}행 ${seat.col}열`;
        }),
      };
    } catch (err) {
      this.logger.error(err.name, err.stack);
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('예매에 실패했습니다.');
    } finally {
      await queryRunner.release();
    }
  }

  async getEventDetail(queryRunner: QueryRunner, eventId: number) {
    const event = await queryRunner.manager.find(Event, {
      where: { id: eventId },
      relations: ['place', 'program'],
    });
    const program = await event[0].program;
    const place = await program.place;

    return { event, program, place };
  }

  async saveReservation(
    queryRunner: QueryRunner,
    reservationCreateDto: ReservationCreateDto,
    userId: number,
    event: Event[],
    program: Program,
  ) {
    const reservationData: any = {
      createdAt: new Date(),
      amount: reservationCreateDto.seats.length,
      program: program,
      event: event[0],
      user: { id: userId },
    };

    const reservation = queryRunner.manager.create(Reservation, reservationData);
    return await queryRunner.manager.save(reservation);
  }

  async savedReservedSeat(
    queryRunner: QueryRunner,
    reservationCreateDto: ReservationCreateDto,
    place: Place,
    event: Event[],
    reservationResult: Reservation,
  ) {
    const sections = reservationCreateDto.seats.map((seat) => {
      if (!place.sections.includes(seat.sectionIndex.toString())) {
        throw new BadRequestException(`해당 section이 존재하지 않습니다. sectionId: ${seat.sectionIndex}`);
      }
      return seat.sectionIndex;
    });

    const sectionInfo = await queryRunner.manager.find(Section, { where: { id: In(sections) } });

    const reservedSeatsInfo: any = reservationCreateDto.seats.map((seat) => {
      const section = sectionInfo.find((section) => section.id === seat.sectionIndex);
      if (seat.seatIndex >= section.seats.length || seat.seatIndex < 0) {
        throw new BadRequestException(
          `해당 section의 seat이 존재하지 않습니다. seatIndex: ${seat.seatIndex}`,
        );
      }
      return {
        event: { id: event[0].id },
        section: section.name,
        // 1행부터 시작하도록 행에 +1
        row: Math.floor(seat.seatIndex / section.colLen) + 1,
        // 1열부터 시작하도록 열에 +1
        col: (seat.seatIndex % section.colLen) + 1,
        reservation: { id: reservationResult.id },
      };
    });
    const reservedSeatInfoEntity = queryRunner.manager.create(ReservedSeat, reservedSeatsInfo);
    await queryRunner.manager.save(ReservedSeat, reservedSeatInfoEntity);
    return reservedSeatsInfo;
  }
}
