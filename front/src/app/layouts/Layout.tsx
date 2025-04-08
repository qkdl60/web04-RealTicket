import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import NotFoundPage from '@/pages/notFoundPage';

import { Loading } from '@/shared/components';
import { Header } from '@/widgets/header';

export default function Layout() {
  return (
    <>
      <Header />
      <div className="mx-auto flex max-w-[1080px] justify-center p-8 pt-4">
        {/* //TODO reset error */}
        <ErrorBoundary fallback={<NotFoundPage />}>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
