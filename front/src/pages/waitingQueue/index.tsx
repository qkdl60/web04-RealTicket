import { Navigate, useParams } from 'react-router-dom';

import { getDate, getTime } from '@/utils/date.ts';

import { ROUTE_URL } from '@/constants/index.ts';
import { Card, Icon, Loading, Progressbar } from '@/shared/components';

import { ALERT_MESSAGE_LIST } from './const';
import { useResetUserOrder, useSuspenseEventQuery, useWaitingData } from './hooks';

export const WaitingQueuePage = () => {
  const { eventId } = useParams();
  useResetUserOrder();

  const { name: eventName, place, runningDate, runningTime } = useSuspenseEventQuery(Number(eventId));
  const { isLoadingWaitingData, myOrder, waitingTimeText, progressValue, totalWaiting, isMyTurn, restCount } =
    useWaitingData(Number(eventId));
  const isInvalidAccess = !eventId || !myOrder;

  const eventInformation = [
    [
      { title: '공연장', content: place.name },
      { title: '관람 시간', content: `${runningTime}분` },
    ],
    [
      { title: '날짜', content: getDate(runningDate) },
      { title: '시간', content: getTime(runningDate) },
    ],
  ];
  const waitingInfo = [
    {
      icon: <Icon iconName="User" color={'primary'} />,
      title: '내 순서',
      content: (
        <span className="text-heading3 text-typo">
          <span className="text-primary">{restCount}</span> 번
        </span>
      ),
    },
    {
      icon: <Icon iconName="Users" color={'warning'} />,
      title: '대기 인원',
      content: (
        <span className="text-heading3 text-typo">
          <span className="text-warning">{totalWaiting}</span> 명
        </span>
      ),
    },
    {
      icon: <Icon iconName="Clock" />,
      title: '예상 대기 시간',
      content: <span className="text-heading3 text-typo">{waitingTimeText}</span>,
    },
  ];

  if (isInvalidAccess) return <Navigate to="/" replace />;
  if (isMyTurn) return <Navigate to={ROUTE_URL.EVENT.DETAIL(Number(eventId))} replace />;
  if (isLoadingWaitingData) return <Loading />;

  return (
    <Card>
      <h2 className="text-heading1 text-typo">{eventName}</h2>
      <div className="flex justify-between">
        {eventInformation.map((infoList) => (
          <div className="flex max-w-[50%] flex-col gap-4">
            {infoList.map((info) => (
              <span className="w-full truncate text-display1 text-typo hover:text-wrap">{`${info.title} : ${info.content}`}</span>
            ))}
          </div>
        ))}
      </div>
      <Progressbar value={progressValue} />
      <div className="flex justify-between">
        {waitingInfo.map((info) => (
          <div className="flex flex-col items-center gap-4">
            {Object.keys(info).map((key) => {
              if (key === 'title') return <span className="text-heading2 text-typo">{info[key]}</span>;
              return info[key as keyof typeof info];
            })}
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-2 text-caption1 text-error">
        {ALERT_MESSAGE_LIST.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
    </Card>
  );
};
