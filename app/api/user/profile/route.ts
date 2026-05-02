import { applySetCookie, proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { data, status, setCookie } = await proxyToService(req, {
    url: '/user/profile',
    method: 'GET',
  });

  return applySetCookie(NextResponse.json(data, { status }), setCookie);
}
