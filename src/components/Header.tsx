import React from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

import { LoadingButton } from '@/components/ui/loading-button';

import AuthService from '@/services/AuthService';
import { useLoadingState } from '@/hooks/useLoadingState';
import { AUTH_ROUTES } from '@/constants/routes';
import { COOKIES } from '@/constants/cookies';

const Header = () => {
  const [isLoading, requestPromise] = useLoadingState();

  const handleSignout = async () => {
    await requestPromise(AuthService.signout());
    Cookies.remove(COOKIES.TOKEN);

    Router.push(AUTH_ROUTES.LOGIN);
  };

  return (
    <header className="header">
      <div className="flex justify-end w-full">
        <LoadingButton size="sm" loading={isLoading} onClick={handleSignout}>
          Log out
        </LoadingButton>
      </div>
    </header>
  );
};

export default Header;
