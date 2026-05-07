import NextAuth, { AuthOptions } from 'next-auth';
import { getKakaoProvider } from './kakao.auth';

export const authOptions: AuthOptions = {
  providers: [getKakaoProvider()],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      if (trigger === 'update') {
        token.needServiceLogin = session.user.needServiceLogin;

        if (session.user.clearRestore) {
          token.status = undefined;
          token.deletedAt = undefined;
          token.gracePeriodEndsAt = undefined;
          token.restoreToken = undefined;
        }
      }

      if (trigger === 'signIn' && account) {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider: account.provider.toUpperCase(),
            oauthAccessToken: account.access_token,
            oauthRefreshToken: account.refresh_token,
            oauthTokenExpiresAt: account.expires_at,
            oauthRefreshExpiresIn: account.refresh_token_expires_in,
          }),
        });

        if (!result.ok) {
          console.log('oauth login fail', `[${account.provider}] : ${result.status}`);
          // todo 실패 시 대응 어떻게?
          token.serviceLoginError = true;
        }

        const data = (await result.json()) as {
          user: { id: string; profileImage: string; name: string };
          status?: 'ACCOUNT_DELETION_PENDING';
          deletedAt?: string;
          gracePeriodEndsAt?: string;
          restoreToken?: string;
        };

        token.serviceUserId = data.user.id;
        token.userProfileImage = data.user.profileImage;
        token.username = data.user.name;
        token.needServiceLogin = true;

        if (data.status === 'ACCOUNT_DELETION_PENDING') {
          token.status = 'ACCOUNT_DELETION_PENDING';
          token.deletedAt = data.deletedAt;
          token.gracePeriodEndsAt = data.gracePeriodEndsAt;
          token.restoreToken = data.restoreToken;
          return token;
        }

        token.serviceLoginError = false;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.serviceUserId = token.serviceUserId;
      session.user.userProfileImage = token.userProfileImage;
      session.user.serviceLoginError = token.serviceLoginError;
      session.user.needServiceLogin = token.needServiceLogin ?? false;
      session.user.status = token.status ?? undefined;
      session.user.deletedAt = token.deletedAt ?? undefined;
      session.user.gracePeriodEndsAt = token.gracePeriodEndsAt ?? undefined;
      session.user.restoreToken = token.restoreToken ?? undefined;

      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
