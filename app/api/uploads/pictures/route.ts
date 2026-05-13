import { applySetCookie, proxyToService } from '@/lib/serviceProxy';
import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import type { ReadableStream as NodeWebReadableStream } from 'node:stream/web';

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type');
  const body = req.body
    ? Readable.fromWeb(req.body as NodeWebReadableStream<Uint8Array>)
    : undefined;

  const { status, data, setCookie } = await proxyToService(req, {
    url: '/uploads/pictures',
    method: 'POST',
    body,
    config: {
      headers: contentType ? { 'Content-Type': contentType } : {},
      timeout: 0,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    },
  });

  return applySetCookie(NextResponse.json(data, { status }), setCookie);
}
