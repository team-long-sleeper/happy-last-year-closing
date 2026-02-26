import { forwardHeaders } from '@/lib/serviceProxy';
import { serviceClient } from '@/lib/axios/instances';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const headers = forwardHeaders(req);

  const result = await serviceClient.post('/auth/refresh', {}, { headers });

  return NextResponse.json(result.data, { status: 200 });
}
