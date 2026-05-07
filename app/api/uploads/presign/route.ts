import { proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, status } = await proxyToService(req, {
    url: '/uploads/presign',
    method: 'POST',
    body: { ...body },
  });

  return NextResponse.json(data, { status });
}
