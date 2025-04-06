import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import WithLogin from '@/app/hocs/withLogin';
import WithoutLogin from '@/app/hocs/withoutLogin';
import { ROUTE_URL } from '@/constants/index.ts';
import Layout from '@/layout/Layout';

const LoginPage = lazy(() => import('@/pages/loginPage'));
const SignUpPage = lazy(() => import('@/pages/signup').then(({ SignUpPage }) => ({ default: SignUpPage })));
const ProgramsPage = lazy(() => import('@/pages/ProgramsPage'));
const ProgramDetailPage = lazy(() => import('@/pages/ProgramDetailPage'));
const AdminPage = lazy(() => import('@/pages/adminPage'));
const ReservationPage = lazy(() => import('@/pages/ReservationPage'));
const ReservationWaitingPage = lazy(() => import('@/pages/ReservationWaitingPage'));
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
      { path: ROUTE_URL.PROGRAM.DEFAULT, element: <ProgramsPage /> },
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
        path: '/admin',
        element: (
          <WithLogin>
            <AdminPage />
          </WithLogin>
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
        path: `${ROUTE_URL.EVENT.DEFAULT}/:eventId`,
        element: (
          // <WithLogin>
          <ReservationPage />
          // </WithLogin>
        ),
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
