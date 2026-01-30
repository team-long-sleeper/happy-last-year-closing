import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth';
import QueryProvider from '@components/providers/QueryProvider';
import SessionProvider from '@components/providers/SessionProvider';

export const metadata: Metadata = {
  title: 'Happy Last Year Closing',
  description: '에피소드 연말결산',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="w-full h-dvh">
        <SessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
