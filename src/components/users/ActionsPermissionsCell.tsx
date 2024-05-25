import React, { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { UserPermission } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import PermissionsList from '@/components/users/PermissionsList';

import { UserFull } from '@/types/users';

type Props = {
  row: Row<UserFull>;
  allPermissions: UserPermission[];
};

const ActionsPermissionsCell = ({ row, allPermissions }: Props) => {
  const permissions: UserPermission[] = row.getValue('permissions');

  const [tempPermissions, setTempPermissions] = useState(permissions);

  const onApplyChanges = () => {
    console.log(tempPermissions);
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
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          {/* loading={loadingDelete} */}
          <LoadingButton type="submit" variant="default" onClick={() => onApplyChanges()}>
            Apply changes
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionsPermissionsCell;
