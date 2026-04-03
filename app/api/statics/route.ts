import { proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { status, data, setCookie } = await proxyToService(req, {
    method: 'GET',
    url: '/statics',
  });

  const res = NextResponse.json(data, { status });

  if (setCookie) {
    if (Array.isArray(setCookie)) {
      for (const c of setCookie) res.headers.append('set-cookie', c);
    } else {
      res.headers.set('set-cookie', setCookie);
    }
  }

  return res;
}
