import { applySetCookie, proxyToService } from '@/lib/serviceProxy';
import { EpisodeUpdateReqSchema } from '@type/episode.types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { status, data, setCookie } = await proxyToService(req, {
    url: `/episodes/${id}`,
    method: 'GET',
  });

  if (data?.pictures) {
    for (const pic of data.pictures) {
      pic.url = pic.url.replace('/episodes/pictures/', '/api/episodes/pictures/');
    }
  }

  return applySetCookie(NextResponse.json(data, { status }), setCookie);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const { status, setCookie } = await proxyToService(req, {
    url: `/episodes/${id}`,
    method: 'DELETE',
  });

  return applySetCookie(NextResponse.json({ status }), setCookie);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const body = await req.json();
  const parsed = EpisodeUpdateReqSchema.safeParse(body);

  if (!parsed.success) return Response.json({ error: parsed.error }, { status: 400 });

  const { status, setCookie, data } = await proxyToService(req, {
    url: `/episodes/${id}`,
    method: 'PATCH',
    body: { ...body },
  });

  return applySetCookie(NextResponse.json(data, { status }), setCookie);
}
