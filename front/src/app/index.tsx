import { RouterProvider } from 'react-router-dom';

import router from '@/pages';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ConfirmContainer, ToastContainer } from './containers';
import { ConfirmProvider, QueryProvider } from './providers';
import './styles/index.css';

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
