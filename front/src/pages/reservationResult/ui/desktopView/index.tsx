import { Link } from 'react-router-dom';

import { Button, Icon, Separator } from '@/shared/components';
import { getDate, getPriceWon, getTime } from '@/shared/libs';

import { ALERT_MESSAGE_LIST } from '../../const';
import type { ViewProps } from '../../types';

export function DesktopView({ name, runningDate, placeName, price, reservationList }: ViewProps) {
  return (
    <div>
      <div className="flex flex-col gap-8 rounded-xl border-2 border-e-surface-sub p-6 shadow-xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <Icon iconName="CheckCircle" className="h-16 w-16" color={'success'} />
          <h2 className="text-heading1 text-typo">예매 성공!!</h2>
          <span className="text-caption1 text-typo-sub">예매가 성공적으로 완료되었습니다!</span>
        </div>
        <Separator direction="row" />
        <div className="flex flex-col gap-12">
          <h2 className="text-heading1 text-typo">{name}</h2>
          <div className="flex items-center gap-4">
            <Icon iconName="Calendar" />
            <span className="text-heading2 text-typo">{`${getDate(new Date(runningDate))} ${getTime(new Date(runningDate))}`}</span>
          </div>
          <div className="flex items-center gap-4">
            <Icon iconName="MapPin" />
            <span className="text-heading2 text-typo">{placeName}</span>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Icon iconName="Ticket" />
              <span className="text-heading2 text-typo">선택한 좌석</span>
            </div>
            <div>
              {reservationList.map((ticket) => (
                <div key={ticket.name} className="flex items-center justify-between text-display1 text-typo">
                  <span>{ticket.name}</span>
                  <span>{getPriceWon(price)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-heading3 text-typo">총 결제 금액</span>
              <span className="text-display1 text-primary">
                {getPriceWon(price * reservationList.length)}
              </span>
            </div>
          </div>
        </div>
        <Separator direction="row" />

        <ul className="list-disc px-6">
          {ALERT_MESSAGE_LIST.map((text) => (
            <li key={text} className="text-caption2 text-typo-sub">
              {text}
            </li>
          ))}
        </ul>
        <Button className="bg-surface" color="default" asChild>
          <Link to="/" className="flex gap-4">
            <Icon iconName="Home" color={'display'} />
            <span className="text-label1 text-typo-display">홈으로 돌아가기</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
