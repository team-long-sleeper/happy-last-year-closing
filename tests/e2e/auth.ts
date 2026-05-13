import { encode } from 'next-auth/jwt';
import type { BrowserContext } from '@playwright/test';

// next-auth.session-token 쿠키에 유효한 JWE 를 직접 발급해서 인증된 상태를 시뮬레이트.
// proxy.ts(withAuth 미들웨어)의 게이트를 통과시키려면 이 쿠키가 필수.
//
// authOptions.callbacks.session 이 token 의 필드를 session.user 에 옮겨주므로,
// useSession() 으로 읽었을 때 자연스러운 모양이 되도록 필드를 채워준다.
export async function getMockSessionToken() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error('NEXTAUTH_SECRET is required for E2E tests (load it via dotenv).');
  }

  return encode({
    token: {
      sub: 'test-user-sub',
      name: 'Test User',
      email: 'test@example.com',
      serviceUserId: 'test-service-user-id',
      userProfileImage: 'https://example.com/avatar.png',
      username: 'Test User',
      needServiceLogin: false,
      serviceLoginError: false,
    },
    secret,
    maxAge: 60 * 60, // 1시간
  });
}

export async function setMockAuthCookies(context: BrowserContext) {
  const sessionToken = await getMockSessionToken();
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
    {
      name: 'access_token',
      value: 'mock-access-token',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);
}
