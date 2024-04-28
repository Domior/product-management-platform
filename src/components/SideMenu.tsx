import React from 'react';
import Link from 'next/link';

import { APP_ROUTES } from '@/constants/routes';

const SideMenu = () => {
  return (
    <nav className="side-menu">
      <ul>
        {Object.entries(APP_ROUTES).map(route => {
          const [name, path] = route;
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
