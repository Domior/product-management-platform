import React, { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@/components/ui/loading-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PageTitle } from '@/components/PageTitle';

import AuthService from '@/services/AuthService';
import { useAsync } from '@/hooks/useAsync';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { SignupType, SignupReturnType } from '@/types/auth';
import { signupSchema } from './form';

const Signup = () => {
  const { data, error, loading, execute } = useAsync<SignupReturnType, SignupType>(AuthService.signup);

  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: ROLES.USER,
    },
  });

  const onSubmit = async (values: SignupType) => {
    const { email, password, displayName, role } = values;

    await execute({ email, password, displayName, role });
  };

  useEffect(() => {
    if (data && !error) {
      Router.push(ROUTES.LOGIN);
    }
  }, [data, error]);

  return (
    <>
      <PageTitle>Sign up</PageTitle>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
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
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
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
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Select a role</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        {Object.values(ROLES).map(role => (
                          <FormItem key={role} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={role} />
                            </FormControl>
                            <FormLabel className="font-normal capitalize">{role.toLowerCase()}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={ROUTES.LOGIN} className="inline-block w-full text-center underline">
                Have an account?
              </Link>
              <div className="flex justify-center">
                <LoadingButton type="submit" loading={loading}>
                  Sign up
                </LoadingButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default Signup;
