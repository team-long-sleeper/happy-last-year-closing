import axios, { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const x = searchParams.get('x');
    const y = searchParams.get('y');
    const radius = searchParams.get('radius') ?? '2000';

    const result = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      params: {
        query,
        x: x ?? undefined,
        y: y ?? undefined,
        radius: x && y ? radius : undefined,
        sort: x && y ? 'distance' : 'accuracy',
      },
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
      },
    });

    return NextResponse.json(result.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log('geocode error status:', axiosError?.response?.status);
    console.log('geocode error data:', axiosError?.response?.data);
    return NextResponse.json(
      { message: 'geocode failed', detail: axiosError?.response?.data ?? axiosError?.message },
      { status: axiosError?.response?.status ?? 500 },
    );
  }
}
