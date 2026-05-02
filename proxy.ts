import withAuth from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: [
    '/((?!login|deleted|restore|privacy|service|_next|fonts|api|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
