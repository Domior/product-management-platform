import Cookies from 'js-cookie';

import { COOKIES } from '@/constants/cookies';

export const clearCookies = () => {
  Object.values(COOKIES).forEach(cookie => Cookies.remove(cookie));
};
