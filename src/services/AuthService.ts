import { LoginType, SignupType, SignoutReturnType, SignupReturnType, LoginReturnType } from '@/types/auth';
import { AUTH_ROUTES } from '@/constants/routes';

import baseInstance from './baseInstance';

class AuthService {
  async login(body: LoginType): Promise<LoginReturnType> {
    return await baseInstance.post(AUTH_ROUTES.LOGIN, body);
  }

  async signup(body: SignupType): Promise<SignupReturnType> {
    return await baseInstance.post(AUTH_ROUTES.SIGNUP, body);
  }

  async signout(): Promise<SignoutReturnType> {
    return await baseInstance.delete(AUTH_ROUTES.SIGNOUT);
  }
}

const authService = new AuthService();
export default authService;
