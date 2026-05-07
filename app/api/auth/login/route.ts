import { serviceClient } from '@/lib/axios/instances';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body as { userId?: string };

  const { status, headers, data } = await serviceClient.post('/auth/login', { userId });

  const res = NextResponse.json(data, { status });

  const setCookie = headers?.['set-cookie'];
  if (setCookie) {
    if (Array.isArray(setCookie)) {
      for (const c of setCookie) res.headers.append('set-cookie', c);
    } else {
      res.headers.set('set-cookie', setCookie);
    }
  }

  return res;
}
