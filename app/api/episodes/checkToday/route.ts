import { applySetCookie, proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { status, data, setCookie } = await proxyToService(req, {
    url: '/episodes/checkToday',
    method: 'GET',
  });

  return applySetCookie(NextResponse.json(data, { status }), setCookie);
}
