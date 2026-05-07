import { applySetCookie, proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { status, setCookie } = await proxyToService(req, {
    method: 'POST',
    url: '/user/logout',
  });

  return applySetCookie(new NextResponse(null, { status }), setCookie);
}
