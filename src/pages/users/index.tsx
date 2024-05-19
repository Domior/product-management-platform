import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/constants/users';
import UserService from '@/services/UserService';

const Users = () => {
  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.USERS_LIST],
    queryFn: async () => await UserService.getUsers(),
  });

  return <div>Users</div>;
};

export default Users;
