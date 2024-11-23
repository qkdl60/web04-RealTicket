import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { AuthService } from '../../../auth/service/auth.service';
import { EventService } from '../../event/service/event.service';
import { BookingAdmissionStatusDto } from '../dto/bookingAdmissionStatusDto';
import { ServerTimeDto } from '../dto/serverTime.dto';

import { InBookingService } from './in-booking.service';

const OFFSET = 1000 * 60 * 60 * 9;

@Injectable()
export class BookingService {
  private logger = new Logger(BookingService.name);
  constructor(
    private readonly eventService: EventService,
    private readonly authService: AuthService,
    private readonly inBookingService: InBookingService,
  ) {}

  // 함수 이름 생각하기
  async isAdmission(eventId: number, sid: string): Promise<BookingAdmissionStatusDto> {
    // eventId를 받아서 해당 이벤트가 존재하는지 확인한다.
    const event = await this.eventService.findEvent({ eventId });
    const now = new Date(Date.now() + OFFSET);

    // event시간 확인 오픈 시간 이전인지
    if (now <= event.reservationOpenDate) {
      // 예약 시간이 아닙니다.
      throw new BadRequestException('아직 예약 오픈 시간이 아닙니다.');
    } else if (now >= event.reservationCloseDate) {
      //event 시간 확인 이벤트 종료시간 이후인지
      // 예약 시간이 아닙니다.
      throw new BadRequestException('이미 예약 마감된 이벤트입니다.');
    }

    await this.authService.setUserEventTarget(sid, eventId);

    return await this.getForwarded(sid);
  }

  private async getForwarded(sid: string) {
    // 입장이 성공하면 user의 상태를 seating room으로 변경하기
    const isEntered = await this.inBookingService.insertIfPossible(sid);
    if (isEntered) {
      await this.authService.setUserStatusSelectingSeat(sid);
      return {
        waitingStatus: false,
        enteringStatus: true,
      };
    }
    // 입장이 실패하면 user의 상태를 waiting room으로 변경하기
    await this.authService.setUserStatusWaiting(sid);
    return {
      waitingStatus: true,
      enteringStatus: false,
    };
  }

  async getTimeMs(): Promise<ServerTimeDto> {
    try {
      return {
        now: Date.now(),
      };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('서버 시간을 가져오는데 실패했습니다.');
    }
  }
}
