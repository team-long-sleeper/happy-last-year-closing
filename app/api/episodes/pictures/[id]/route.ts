import { applySetCookie, proxyStreamToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { status, body, contentType, data, setCookie } = await proxyStreamToService(req, {
    url: `/episodes/pictures/${id}`,
    method: 'GET',
  });

  if (status >= 400 || !body) {
    return applySetCookie(
      NextResponse.json(data ?? { message: 'Not found' }, { status }),
      setCookie,
    );
  }

  return applySetCookie(
    new NextResponse(body, {
      status,
      headers: {
        'Content-Type': contentType ?? 'application/octet-stream',
        'Cache-Control': 'private, max-age=3600',
      },
    }),
    setCookie,
  );
}
