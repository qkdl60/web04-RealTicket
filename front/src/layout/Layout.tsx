import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import Navbar from '@/components/Navbar/index.tsx';

import LoadingPage from '@/pages/LoadingPage';
import NotFoundPage from '@/pages/NotFoundPage.tsx';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex max-w-[1080px] justify-center p-8 pt-4">
        <ErrorBoundary fallback={<NotFoundPage />}>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
