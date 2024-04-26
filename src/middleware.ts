import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AUTH_ROUTES, APP_ROUTES } from '@/constants/routes';
import { COOKIES } from '@/constants/cookies';

export default function middleware(req: NextRequest) {
  let isAuthenticated = req.cookies.get(COOKIES.TOKEN);

  if (isAuthenticated && Object.values(AUTH_ROUTES).includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(APP_ROUTES.PRODUCTS);
  }
  if (!isAuthenticated && Object.values(APP_ROUTES).includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL(AUTH_ROUTES.LOGIN, req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
