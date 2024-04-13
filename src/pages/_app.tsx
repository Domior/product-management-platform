import { useEffect, useCallback, useMemo } from 'react';
import type { AppProps } from 'next/app';

import { AuthLayout } from '@/components/layouts/AuthLayout';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Toaster } from '@/components/ui/toaster';

import { useAuth } from '@/hooks/useAuth';
import { AUTH_ROUTES, APP_ROUTES } from '@/constants/routes';

import '@/styles/globals.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const { authenticated } = useAuth();

  const isAuthPath = router.pathname.startsWith(AUTH_ROUTES.AUTH);

  const routes = Object.values(APP_ROUTES);
  const isAppPath = routes.includes(router.pathname);

  const Layout = isAuthPath ? AuthLayout : MainLayout;

  const checkAuth = useCallback(() => {
    if (authenticated && !isAppPath) {
      router.replace(APP_ROUTES.PRODUCTS);
      return;
    }

    if (!authenticated && !isAuthPath) {
      router.replace(AUTH_ROUTES.LOGIN);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
};

export default MyApp;
