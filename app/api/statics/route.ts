import { proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { status, data, setCookie } = await proxyToService(req, {
    method: 'GET',
    url: '/statics',
  });

  if (data?.topTags) {
    for (const tag of data.topTags) {
      if (tag.thumbnail?.url) {
        tag.thumbnail.url = tag.thumbnail.url.replace('/episodes/pictures/', '/api/episodes/pictures/');
      }
    }
  }

  const res = NextResponse.json(data, { status });

  if (setCookie) {
    if (Array.isArray(setCookie)) {
      for (const c of setCookie) res.headers.append('set-cookie', c);
    } else {
      res.headers.set('set-cookie', setCookie);
    }
  }

  return res;
}
