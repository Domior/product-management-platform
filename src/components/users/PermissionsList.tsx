import React, { Dispatch, SetStateAction } from 'react';
import { UserPermission } from '@prisma/client';

import PermissionItem from './PermissionItem';

type Props = { allPermissions: UserPermission[]; userPermissions: UserPermission[]; onSetTempPermissions: Dispatch<SetStateAction<UserPermission[]>> };

const PermissionsList = ({ allPermissions, userPermissions, onSetTempPermissions }: Props) => {
  return allPermissions.map(permission => {
    const isSet = userPermissions.some(item => item.id === permission.id);
    return <PermissionItem key={permission.id} permission={permission} initialIsSet={isSet} onSetTempPermissions={onSetTempPermissions} />;
  });
};

export default PermissionsList;
