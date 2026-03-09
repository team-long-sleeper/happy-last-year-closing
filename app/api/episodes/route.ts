import { proxyToService } from '@/lib/serviceProxy';
import { CreateEpisodeSchema } from '@/types/episode.types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = CreateEpisodeSchema.safeParse(body);

  if (!parsed.success) return Response.json({ error: parsed.error }, { status: 400 });

  const { status, data } = await proxyToService(req, {
    url: '/episodes',
    method: 'POST',
    body: { ...body },
  });

  return NextResponse.json(data, { status });
}
