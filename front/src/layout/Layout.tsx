import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import LoadingPage from '@/pages/loadingPage';
import NotFoundPage from '@/pages/notFoundPage';

import Navbar from './components/navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex max-w-[1080px] justify-center p-8 pt-4">
        {/* //TODO reset error */}
        <ErrorBoundary fallback={<NotFoundPage />}>
          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
