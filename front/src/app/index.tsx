import { RouterProvider } from 'react-router-dom';

import ConfirmContainer from '@/components/Confirm/ConfirmContainer.tsx';

import ToastContainer from '@/app/containers/toastContainer';
import router from '@/pages';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ConfirmProvider, QueryProvider } from './providers';

function App() {
  return (
    <QueryProvider>
      <ConfirmProvider>
        <RouterProvider router={router} />
        <ToastContainer />
        <ConfirmContainer />
      </ConfirmProvider>
      <ReactQueryDevtools />
    </QueryProvider>
  );
}

export default App;
