import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { UserPermission } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Pagination from '@/components/Pagination';
import UsersTable from '@/components/users/UsersTable';
import ActionsPermissionsCell from '@/components/users/ActionsPermissionsCell';

import PermissionsService from '@/services/PermissionsService';
import { QUERY_KEYS, USERS_PER_PAGE } from '@/constants/users';
import UserService from '@/services/UserService';
import { usePagination } from '@/hooks/usePagination';
import { UserFull } from '@/types/users';
import { useAsync } from '@/hooks/useAsync';

const Users = () => {
  const { currentPage, paginate, handleNextClick, handlePrevClick } = usePagination();

  const { data: allPermissions, loading: loadingPermissions, execute: executePermissions } = useAsync<UserPermission[]>(PermissionsService.getAllPermissions);

  const { isLoading, data } = useQuery({
    queryKey: [QUERY_KEYS.USERS_LIST, currentPage],
    queryFn: async () => await UserService.getUsers({ page: currentPage, limit: USERS_PER_PAGE }),
  });

  const columns: ColumnDef<UserFull>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'displayName',
        header: 'Display Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'role',
        header: 'Role',
      },
      {
        accessorKey: 'permissions',
        header: 'Permissions',
        cell: ({ row }) => {
          const permissions: UserPermission[] = row.getValue('permissions');
          const permissionsLabel = permissions.map(permission => permission.label);

          return (
            <div className="flex gap-x-1">
              {permissionsLabel.map(item => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          if (loadingPermissions) return <LoadingSpinner />;
          if (!allPermissions) return null;

          return <ActionsPermissionsCell row={row} allPermissions={allPermissions} />;
        },
      },
    ],
    [allPermissions, loadingPermissions],
  );

  useEffect(() => {
    executePermissions();
  }, [executePermissions]);

  return (
    <>
      {!isLoading && data ? (
        <div className="mt-5">
          <UsersTable data={data.results} columns={columns} />
          <Pagination
            className="mt-10"
            limit={USERS_PER_PAGE}
            total={data.total}
            currentPage={currentPage}
            paginate={paginate}
            handleNextClick={handleNextClick}
            handlePrevClick={handlePrevClick}
          />
        </div>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <LoadingSpinner size={40} />
        </div>
      )}
    </>
  );
};

export default Users;
