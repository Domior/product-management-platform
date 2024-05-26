import React, { useState, useRef } from 'react';
import { Row } from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { UserPermission } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import PermissionsList from '@/components/users/PermissionsList';

import UserService from '@/services/UserService';
import { useAsync } from '@/hooks/useAsync';
import { UserFull, UpdateUserPermissionsType } from '@/types/users';
import { QUERY_KEYS } from '@/constants/users';

type Props = {
  row: Row<UserFull>;
  allPermissions: UserPermission[];
};

const ActionsPermissionsCell = ({ row, allPermissions }: Props) => {
  const queryClient = useQueryClient();
  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);

  const permissions: UserPermission[] = row.getValue('permissions');

  const [tempPermissions, setTempPermissions] = useState(permissions);

  const { data, loading: updatingPermissions, execute: executeUpdating } = useAsync<UserPermission[], UpdateUserPermissionsType>(UserService.updateUserPermissions);

  const onApplyChanges = async () => {
    await executeUpdating({ userId: row.original.id, body: { permissions: tempPermissions } });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS_LIST] });
    modalCloseButtonRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Edit Permissions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Permissions</DialogTitle>
          <DialogDescription>Chose the permissions for this user</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <PermissionsList allPermissions={allPermissions} userPermissions={permissions} onSetTempPermissions={setTempPermissions} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" ref={modalCloseButtonRef}>
              Close
            </Button>
          </DialogClose>
          <LoadingButton type="submit" variant="default" loading={updatingPermissions} onClick={onApplyChanges}>
            Apply changes
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionsPermissionsCell;
