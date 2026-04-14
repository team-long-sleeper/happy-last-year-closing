import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const SERVICE_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 });
  }

  const formData = await req.formData();

  const res = await fetch(`${SERVICE_BASE_URL}/uploads/pictures`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      // Content-Type 직접 설정 안 함 → fetch가 multipart boundary 자동 설정
    },
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
