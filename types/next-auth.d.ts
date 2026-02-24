// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      serviceUserId?: string;
      serviceLoginError?: boolean;
      needServiceLogin: boolean;
      serviceAuthenticated: boolean;
    };
  }

  // interface User {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    serviceUserId?: string;
    serviceLoginError?: boolean;
    needServiceLogin?: boolean;
    serviceAuthenticated: boolean;
  }
}
