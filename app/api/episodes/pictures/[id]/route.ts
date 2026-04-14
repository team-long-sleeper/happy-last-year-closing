import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SERVICE_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  const res = await fetch(`${SERVICE_BASE_URL}/episodes/pictures/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ message: 'Not found' }, { status: res.status });
  }

  const contentType = res.headers.get('content-type') ?? 'application/octet-stream';

  return new NextResponse(res.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
