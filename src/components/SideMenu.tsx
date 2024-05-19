import React from 'react';
import Link from 'next/link';

import { APP_ROUTES, ADMIN_ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { useUser } from '@/hooks/useUser';

const SideMenu = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <nav className="side-menu">
      <ul>
        {Object.entries(APP_ROUTES).map(route => {
          const [name, path] = route;
          if (user?.user_metadata.role !== ROLES.ADMIN && ADMIN_ROUTES.includes(path)) return <React.Fragment key={name} />;

          return (
            <li key={name}>
              <Link href={path} className="py-2 inline-block w-full text-center capitalize hover:bg-slate-200 ">
                {name.toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideMenu;
