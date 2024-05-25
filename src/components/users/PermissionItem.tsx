import React, { useState, Dispatch, SetStateAction } from 'react';
import { UserPermission } from '@prisma/client';

import { Button } from '@/components/ui/button';

type Props = {
  permission: UserPermission;
  initialIsSet: boolean;
  onSetTempPermissions: Dispatch<SetStateAction<UserPermission[]>>;
};

const PermissionItem = ({ permission, initialIsSet, onSetTempPermissions }: Props) => {
  const [isSet, setIsSet] = useState(initialIsSet);

  return (
    <div className="flex items-center justify-between">
      <p>{permission.label}</p>
      <div className="flex items-center gap-x-2">
        <Button
          variant={isSet ? 'destructive' : 'secondary'}
          onClick={() => {
            setIsSet(!isSet);
            onSetTempPermissions(prev => {
              const withoutCurrent = prev.filter(item => item.id !== permission.id);

              return isSet ? [...withoutCurrent] : [...prev, permission];
            });
          }}
        >
          {isSet ? 'Unset' : 'Set'}
        </Button>
      </div>
    </div>
  );
};

export default PermissionItem;
