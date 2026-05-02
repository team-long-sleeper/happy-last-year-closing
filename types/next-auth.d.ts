// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      serviceUserId?: string;
      username?: string;
      userProfileImage?: string;
      serviceLoginError?: boolean;
      needServiceLogin: boolean;
      status?: 'ACCOUNT_DELETION_PENDING';
      deletedAt?: string;
      gracePeriodEndsAt?: string;
      restoreToken?: string;
    };
  }

  // interface User {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    serviceUserId?: string;
    username?: string;
    userProfileImage?: string;
    serviceLoginError?: boolean;
    needServiceLogin?: boolean;
    status?: 'ACCOUNT_DELETION_PENDING';
    deletedAt?: string;
    gracePeriodEndsAt?: string;
    restoreToken?: string;
  }
}
