import { proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { status, data, setCookie } = await proxyToService(req, {
    method: 'GET',
    url: '/friends',
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

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, status } = await proxyToService(req, {
    url: '/friends',
    method: 'POST',
    body: { ...body },
  });

  return NextResponse.json(data, { status });
}
