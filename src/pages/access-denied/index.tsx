import React from 'react';

import { PageTitle } from '@/components/PageTitle';
import { Title } from '@/components/Title';

const AccessDenied = () => {
  return (
    <>
      <PageTitle>Access Denied</PageTitle>
      <div className="flex flex-col items-center">
        <Title>Access Denied</Title>
        <p>Sorry. You don`t have access to see this page</p>
      </div>
    </>
  );
};

export default AccessDenied;
