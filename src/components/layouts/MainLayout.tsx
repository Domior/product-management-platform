import React from 'react';

import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

export const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="main-layout">
      <SideMenu />

      <div className="w-full h-full">
        <Header />

        <div className="py-6 container max-w-none">{children}</div>
      </div>
    </div>
  );
};
