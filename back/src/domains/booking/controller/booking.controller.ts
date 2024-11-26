import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Sse,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { USER_STATUS } from '../../../auth/const/userStatus.const';
import { SessionAuthGuard } from '../../../auth/guard/session.guard';
import { SeatStatus } from '../const/seatStatus.enum';
import { BookingAmountReqDto } from '../dto/bookingAmountReqDto';
import { BookingAmountResDto } from '../dto/bookingAmountResDto';
import { BookReqDto } from '../dto/bookReqDto';
import { BookResDto } from '../dto/bookResDto';
import { SeatsSseDto } from '../dto/seatsSse.dto';
import { ServerTimeDto } from '../dto/serverTime.dto';
import { WaitingSseDto } from '../dto/waitingSse.dto';
import { BookingSeatsService } from '../service/booking-seats.service';
import { BookingService } from '../service/booking.service';
import { InBookingService } from '../service/in-booking.service';
import { WaitingQueueService } from '../service/waiting-queue.service';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly bookingService: BookingService,
    private readonly inBookingService: InBookingService,
    private readonly bookingSeatsService: BookingSeatsService,
    private readonly waitingQueueService: WaitingQueueService,
  ) {}

  @UseGuards(SessionAuthGuard())
  @Get('permission/:eventId')
  async requestAdmission(
    @Param('eventId', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) eventId: number,
    @Req() req: Request,
  ) {
    const sid = req.cookies['SID'];
    return await this.bookingService.isAdmission(eventId, sid);
  }

  @Sse('re-permission/:eventId')
  @UseGuards(SessionAuthGuard(USER_STATUS.WAITING))
  @ApiOperation({
    summary: '대기큐 현황 SSE',
    description: '대기큐의 대기 현황을 구독한다.',
  })
  @ApiOkResponse({ description: 'SSE 연결 성공', type: WaitingSseDto })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  async subscribeWaitingQueue(@Param('eventId') eventId: number) {
    return this.waitingQueueService.subscribeQueue(eventId);
  }

  @UseGuards(SessionAuthGuard(USER_STATUS.SELECTING_SEAT))
  @Post('count')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: '예매 인원 설정', description: '예매할 인원 수를 설정한다.' })
  @ApiBody({ type: BookingAmountReqDto })
  @ApiOkResponse({ description: '인원 설정 성공', type: BookingAmountReqDto })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  async setBookingAmount(@Req() req: Request, @Body() dto: BookingAmountReqDto) {
    const sid = req.cookies['SID'];
    const result = await this.inBookingService.setBookingAmount(sid, dto.bookingAmount);
    return new BookingAmountResDto(result);
  }

  @Sse('seat/:eventId')
  @UseGuards(SessionAuthGuard(USER_STATUS.SELECTING_SEAT))
  @ApiOperation({
    summary: '실시간 좌석 예약 현황 SSE',
    description: '실시간으로 좌석 예약 현황을 조회한다.',
  })
  @ApiOkResponse({ description: 'SSE 연결 성공', type: SeatsSseDto })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  async getReservationStatusByEventId(@Param('eventId') eventId: number, @Req() req: Request) {
    const observable = this.bookingSeatsService.subscribeSeats(eventId);

    const sid = req.cookies['SID'];
    req.on('close', () => {
      this.eventEmitter.emit('seats-sse-close', { sid });
    });

    return observable;
  }

  @Post('')
  @UseGuards(SessionAuthGuard(USER_STATUS.SELECTING_SEAT))
  @ApiOperation({
    summary: '좌석 점유/취소',
    description: '좌석 하나를 대상으로 점유/취소 요청을 보낸다.',
  })
  @ApiOkResponse({ description: '좌석 점유/취소 성공' })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  @ApiBadRequestResponse({ description: '잘못된 요청' })
  @ApiConflictResponse({ description: '이미 점유/취소된 좌석' })
  async updateSeatOccupancy(@Req() req: Request, @Body() dto: BookReqDto) {
    const sid = req.cookies['SID'];

    if (dto.expectedStatus === SeatStatus.RESERVE) {
      const result = await this.bookingSeatsService.bookSeat(sid, [dto.sectionIndex, dto.seatIndex]);
      return new BookResDto(result);
    } else if (dto.expectedStatus === SeatStatus.DELETE) {
      const result = await this.bookingSeatsService.unBookSeat(sid, [dto.sectionIndex, dto.seatIndex]);
      return new BookResDto(result);
    }
  }

  @ApiOperation({ summary: '서버 시간 조회', description: '서버의 현재 시간을 조회한다.' })
  @ApiOkResponse({ description: '서버 시간 조회 성공', type: ServerTimeDto, example: { now: 1620000000000 } })
  @ApiUnauthorizedResponse({ description: '인증 실패' })
  @ApiInternalServerErrorResponse({ description: '서버 시간 조회 실패' })
  @UseGuards(SessionAuthGuard())
  @Get('server-time')
  async getServerTime() {
    return await this.bookingService.getTimeMs();
  }
}
