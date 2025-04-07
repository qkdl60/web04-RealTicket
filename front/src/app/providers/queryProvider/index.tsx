import { PropsWithChildren } from 'react';

import { queryClient } from '@/api/queryClient.ts';

import { QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
