import React, { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

import { LoadingButton } from '@/components/ui/loading-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { PageTitle } from '@/components/PageTitle';

import AuthService from '@/services/AuthService';
import SupabaseService from '@/services/SupabaseService';
import { useAsync } from '@/hooks/useAsync';
import { AUTH_ROUTES, APP_ROUTES } from '@/constants/routes';
import { COOKIES } from '@/constants/cookies';
import { LoginType, LoginReturnType } from '@/types/auth';

import { loginSchema } from './form';

const Login = () => {
  const { data, error, loading, execute } = useAsync<LoginReturnType, LoginType>(AuthService.login);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginType) => {
    const { email, password } = values;

    await execute({ email, password });
  };

  useEffect(() => {
    if (data && !error) {
      SupabaseService.setSession(data.session!).then(() => {
        Cookies.set(COOKIES.TOKEN, data.session!.access_token);
        Router.push(APP_ROUTES.PRODUCTS);
      });
    }
  }, [data, error]);

  return (
    <>
      <PageTitle>Login</PageTitle>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="Enter password" maxLength={20} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={AUTH_ROUTES.SIGNUP} className="inline-block w-full text-center underline">
                Don`t have an account?
              </Link>
              <div className="flex justify-center">
                <LoadingButton type="submit" loading={loading}>
                  Log in
                </LoadingButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default Login;
