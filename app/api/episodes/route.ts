import { applySetCookie, proxyToService } from '@/lib/serviceProxy';
import { EpisodeCreateReqSchema } from '@type/episode.types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = EpisodeCreateReqSchema.safeParse(body);

  if (!parsed.success) return Response.json({ error: parsed.error }, { status: 400 });

  const { status, data } = await proxyToService(req, {
    url: '/episodes',
    method: 'POST',
    body: { ...body },
  });

  return NextResponse.json(data, { status });
}

export async function GET(req: NextRequest) {
  const { status, data, setCookie } = await proxyToService(req, {
    url: '/episodes',
    method: 'GET',
  });

  if (data?.episodes) {
    for (const ep of data.episodes) {
      for (const pic of ep.pictures ?? []) {
        pic.url = pic.url.replace('/episodes/pictures/', '/api/episodes/pictures/');
      }
    }
  }

  return applySetCookie(NextResponse.json(data, { status }), setCookie);
}
