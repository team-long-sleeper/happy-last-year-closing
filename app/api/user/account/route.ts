import { applySetCookie, proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const { status, setCookie } = await proxyToService(req, {
    url: `/user/account`,
    method: 'DELETE',
  });

  return applySetCookie(new NextResponse(null, { status }), setCookie);
}
