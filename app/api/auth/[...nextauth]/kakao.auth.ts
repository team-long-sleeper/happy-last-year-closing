import KakaoProvider from 'next-auth/providers/kakao';

export const getKakaoCredentials = () => {
  const clientId = process.env.KAKAO_CLIENT_ID;
  const clientSecret = process.env.KAKAO_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error('Missing KAKAO_CLIENT_ID');
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing KAKAO_CLIENT_SECRET');
  }

  return { clientId, clientSecret };
};

export const getKakaoProvider = () =>
  KakaoProvider({
    clientId: getKakaoCredentials().clientId,
    clientSecret: getKakaoCredentials().clientSecret,
  });
