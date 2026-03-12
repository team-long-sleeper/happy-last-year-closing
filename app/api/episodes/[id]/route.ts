import { proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { status, data } = await proxyToService(req, {
    url: `/episodes/:${id}`,
    method: 'GET',
  });

  return NextResponse.json(data, { status });
}
