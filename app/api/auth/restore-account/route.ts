import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../[...nextauth]/route';
import { serviceClient } from '@/lib/axios/instances';
import { forwardHeaders } from '@/lib/serviceProxy';
import { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return new NextResponse(null, { status: 401 });

  try {
    const result = await serviceClient.post(
      '/auth/restore-account',
      { restoreToken: session.user.restoreToken },
      {
        headers: {
          ...forwardHeaders(req),
          'Content-Type': 'application/json',
        },
      },
    );

    return new NextResponse(null, { status: result.status });
  } catch (error) {
    const err = error as AxiosError;
    const status = err.response?.status ?? 500;
    return new NextResponse(null, { status });
  }
}
