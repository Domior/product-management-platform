import type { AppProps } from 'next/app';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { MainLayout } from '@/components/layouts/MainLayout';
import { Toaster } from '@/components/ui/toaster';

import '@/styles/globals.css';

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  const getLayout = () => {
    if (router.pathname.startsWith('/auth/')) {
      const Layout = (page: React.ReactNode) => <AuthLayout>{page}</AuthLayout>;
      Layout.displayName = 'AuthLayout';
      return Layout;
    } else {
      const Layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;
      Layout.displayName = 'MainLayout';
      return Layout;
    }
  };

  const layout = getLayout();

  return layout(
    <>
      <Component {...pageProps} />
      <Toaster />
    </>,
  );
};

export default MyApp;
