/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from 'next-auth';
import { getKakaoProvider } from './kakao.auth';

export const authOptions: AuthOptions = {
  providers: [getKakaoProvider()],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === 'kakao' && account.access_token) {
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          // note 서버-서버 인증 헤더 추가?
          // headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.INTERNAL_API_KEY}` },
          body: JSON.stringify({
            provider: account.provider,
            kakaoAccessToken: account.access_token,
          }),
        });

        if (!result.ok) {
          // todo serviceLoginError 플래그 처리
          token.serviceLoginError = true;
          return token;
        }

        const data = (await result.json()) as {
          accessToken: string;
          user: { id: string; email?: string | null; nickname?: string | null };
          expiresIn: number;
        };

        token.serviceAccessToken = data.accessToken;
        token.serviceUserId = data.user.id;
        token.serviceTokenExp = Date.now() + data.expiresIn * 1000;
      }

      return token;
    },
    async session({ session, token }) {
      (session as any).serviceUserId = token.serviceUserId;
      (session as any).serviceLoginError = token.serviceLoginError ?? false;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
