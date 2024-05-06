import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Toaster } from '@/components/ui/toaster';

import { AUTH_ROUTES } from '@/constants/routes';

import '@/styles/globals.css';

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  if (typeof window === 'undefined') React.useLayoutEffect = React.useEffect;

  const isAuthPath = router.pathname.startsWith(AUTH_ROUTES.AUTH);

  const Layout = isAuthPath ? AuthLayout : MainLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </QueryClientProvider>
  );
};

export default MyApp;
