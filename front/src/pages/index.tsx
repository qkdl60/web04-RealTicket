import { lazy, useEffect } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import WithLogin from '@/app/hocs/withLogin';
// import { WithReservationGuard } from '@/app/hocs/withResrvationGuard/index.tsx';
import WithoutLogin from '@/app/hocs/withoutLogin';
import { ROUTE_URL } from '@/constants/index.ts';
import { RESERVATION_STEP } from '@/constants/reservation.ts';
import Layout from '@/layout/Layout';

const WithTest = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log('hi');
  }, []);

  return children;
};

const LoginPage = lazy(() => import('@/pages/login').then(({ LoginPage }) => ({ default: LoginPage })));
const SignUpPage = lazy(() => import('@/pages/signup').then(({ SignUpPage }) => ({ default: SignUpPage })));
const MainPage = lazy(() => import('@/pages/main').then(({ MainPage }) => ({ default: MainPage })));
const ProgramDetailPage = lazy(() =>
  import('@/pages/programDetail').then(({ ProgramDetailPage }) => ({ default: ProgramDetailPage })),
);
const CaptchaPage = lazy(() =>
  import('@/pages/checkCaptcha').then(({ CaptchaPage }) => ({ default: CaptchaPage })),
);
const ReservationWaitingPage = lazy(() =>
  import('@/pages/reservationWaiting').then(({ ReservationWaitingPage }) => ({
    default: ReservationWaitingPage,
  })),
);
const WaitingQueuePage = lazy(() =>
  import('@/pages/waitingQueue').then(({ WaitingQueuePage }) => ({ default: WaitingQueuePage })),
);
const NotFoundPage = lazy(() => import('@/pages/notFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Navigate to={ROUTE_URL.PROGRAM.DEFAULT} /> },
      { path: ROUTE_URL.PROGRAM.DEFAULT, element: <MainPage /> },
      { path: `${ROUTE_URL.PROGRAM.DEFAULT}/:programId`, element: <ProgramDetailPage /> },
      {
        path: ROUTE_URL.USER.LOGIN,
        element: (
          <WithoutLogin>
            <LoginPage />
          </WithoutLogin>
        ),
      },

      {
        path: ROUTE_URL.USER.SIGN_UP,
        element: (
          <WithoutLogin>
            <SignUpPage />
          </WithoutLogin>
        ),
      },
      {
        path: `${ROUTE_URL.EVENT.DEFAULT}/:eventId/ready`,
        element: (
          // <WithLogin>
          <ReservationWaitingPage />
          // </WithLogin>
        ),
      },
      {
        path: `${ROUTE_URL.EVENT.DEFAULT}/:eventId/reservation`,
        element: (
          // <WithLogin>
          //   <WithReservationGuard>
          <WithTest>
            <Outlet />
          </WithTest>
          //   </WithReservationGuard>
          // </WithLogin>
        ),
        children: [
          { path: RESERVATION_STEP.CAPTCHA, element: <CaptchaPage /> },
          { path: RESERVATION_STEP.SELECT_COUNT, element: <div>seatCount</div> },
          { path: RESERVATION_STEP.SELECT_SECTION_SEAT, element: <div>booking</div> },
          { path: RESERVATION_STEP.RESULT, element: <div>result</div> },
        ],
      },
      {
        path: `${ROUTE_URL.EVENT.DEFAULT}/:eventId/waiting`,
        element: (
          <WithLogin>
            <WaitingQueuePage />
          </WithLogin>
        ),
      },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
]);

export default router;
