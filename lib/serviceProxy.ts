/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { serviceClient } from './axios/instances';
import { AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

type ServiceFetchOpts = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  data?: unknown;
  config?: AxiosRequestConfig;
};

type StreamFetchOpts = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: BodyInit | null;
  config?: { headers?: Record<string, string> };
};

export function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? null;
}

export function forwardHeaders(req: NextRequest) {
  const headers: Record<string, string> = {};

  const cookie = req.headers.get('cookie');
  if (cookie) headers.cookie = cookie;

  const ua = req.headers.get('user-agent');
  if (ua) headers['user-agent'] = ua;

  const ip = getClientIp(req);
  if (ip) headers['x-forwarded-for'] = ip;

  return headers;
}

function getCookieValue(setCookie: string[] | undefined, name: string) {
  if (!setCookie) return null;

  for (const cookie of setCookie) {
    const match = cookie.match(new RegExp(`^${name}=([^;]+)`));
    if (match) return match[1];
  }
  return null;
}

function filterStringHeaders(headers: unknown): Record<string, string> {
  return Object.entries((headers ?? {}) as Record<string, unknown>).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'string') acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

async function tryRefresh(
  headers: Record<string, string>,
): Promise<{ ok: true; headers: any; setCookie: any } | { ok: false; data: any }> {
  try {
    console.log('try refresh --------------------------------------------->');
    const result = await serviceClient.post('/auth/refresh', {}, { headers });
    const setCookie = result.headers['set-cookie'];

    return { ok: true, headers: result.headers, setCookie };
  } catch (e: any) {
    return { ok: false, data: e?.response?.data ?? { message: 'Refresh failed' } };
  }
}

// 한 번의 요청 시도 결과를 정규화한 타입.
// axios는 4xx에서 throw, fetch는 throw하지 않으므로
// 호출 측이 둘 다 이 모양으로 맞춰서 돌려준다.
type Attempt<T> =
  | { kind: 'ok'; result: T }
  | { kind: 'auth' } // 401 → refresh 트리거
  | { kind: 'fail'; status: number; data: any };

// 토큰 + refresh + 1회 재시도 정책만 담당하는 코어 헬퍼.
// 실제 HTTP 호출은 attempt 콜백에 위임 → axios/fetch 어떤 클라이언트든 재사용 가능.
async function withAuthRetry<T>(
  req: NextRequest,
  configHeaders: unknown,
  attempt: (authedHeaders: Record<string, string>) => Promise<Attempt<T>>,
): Promise<
  | { ok: true; result: T; setCookieFromRefresh?: string | string[] }
  | { ok: false; status: number; data: any }
> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshKey = cookieStore.get('refresh_key');

  const baseHeaders = forwardHeaders(req);
  const filteredHeaders = filterStringHeaders(configHeaders);

  if (!accessToken) {
    if (!refreshKey) {
      return {
        ok: false,
        status: 401,
        data: { code: 'AUTH_REQUIRED', message: 'Unauthenticated' },
      };
    }

    const refreshed = await tryRefresh({ ...filteredHeaders, ...baseHeaders });
    if (!refreshed.ok) {
      console.log('refreshed  ❌❌❌❌❌', refreshed);

      if (refreshed.data?.error === 'REVOKED_REFRESH') {
        return {
          ok: false,
          status: 401,
          data: { code: 'AUTH_REQUIRED', message: 'Unauthenticated' },
        };
      }
      return { ok: false, status: 401, data: refreshed.data };
    }

    const newAccess = getCookieValue(refreshed.setCookie, 'access_token');
    const result = await attempt({
      ...baseHeaders,
      Authorization: `Bearer ${newAccess}`,
    });

    if (result.kind === 'ok') {
      return { ok: true, result: result.result, setCookieFromRefresh: refreshed.setCookie };
    }
    if (result.kind === 'auth') {
      return { ok: false, status: 401, data: { message: 'Unauthenticated' } };
    }
    return { ok: false, status: result.status, data: result.data };
  }

  const first = await attempt({
    ...baseHeaders,
    Authorization: `Bearer ${accessToken.value}`,
  });

  if (first.kind === 'ok') {
    return { ok: true, result: first.result };
  }
  if (first.kind === 'fail') {
    return { ok: false, status: first.status, data: first.data };
  }

  const refreshed = await tryRefresh({ ...filteredHeaders, ...baseHeaders });
  if (!refreshed.ok) {
    console.log('refreshed  ❌❌❌❌❌');
    return { ok: false, status: 401, data: refreshed.data };
  }

  const newAccess = getCookieValue(refreshed.setCookie, 'access_token');
  const second = await attempt({
    ...baseHeaders,
    Authorization: `Bearer ${newAccess}`,
  });

  if (second.kind === 'ok') {
    return { ok: true, result: second.result, setCookieFromRefresh: refreshed.setCookie };
  }
  if (second.kind === 'auth') {
    return { ok: false, status: 401, data: { message: 'Unauthenticated' } };
  }
  return { ok: false, status: second.status, data: second.data };
}

// todo METHOD 별로 CLASS 화 할까 ???? axios 쓰는 것처럼
export async function proxyToService(
  req: NextRequest,
  opts: ServiceFetchOpts,
): Promise<{ status: number; data?: any; headers?: any; setCookie?: string | string[] }> {
  type Ok = {
    status: number;
    data: any;
    headers: any;
    setCookie?: string | string[];
  };

  const result = await withAuthRetry<Ok>(req, opts.config?.headers, async (authedHeaders) => {
    try {
      const res = await serviceClient.request({
        method: opts.method,
        url: opts.url,
        data: opts.body,
        ...opts.config,
        headers: {
          ...authedHeaders,
          ...(opts.config?.headers ?? {}),
        },
      });
      return {
        kind: 'ok',
        result: {
          status: res.status,
          data: res.data,
          headers: res.headers,
          setCookie: res.headers['set-cookie'],
        },
      };
    } catch (error: any) {
      const status = (error?.response?.status ?? 500) as number;
      if (status === 401) return { kind: 'auth' };
      return {
        kind: 'fail',
        status,
        data: error?.response?.data ?? { message: 'Service error' },
      };
    }
  });

  if (!result.ok) {
    return { status: result.status, data: result.data };
  }

  return {
    status: result.result.status,
    data: result.result.data,
    headers: result.result.headers,
    setCookie: result.setCookieFromRefresh ?? result.result.setCookie,
  };
}

// 바이너리/스트림 응답 전용 프록시. 응답을 파싱하지 않고
// ReadableStream 그대로 반환해서 호출 측이 NextResponse 로 패스스루 가능.
export async function proxyStreamToService(
  req: NextRequest,
  opts: StreamFetchOpts,
): Promise<{
  status: number;
  body?: ReadableStream<Uint8Array> | null;
  contentType?: string;
  data?: any;
  setCookie?: string | string[];
}> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  type Ok = {
    status: number;
    body: ReadableStream<Uint8Array> | null;
    contentType: string;
  };

  const result = await withAuthRetry<Ok>(req, opts.config?.headers, async (authedHeaders) => {
    const res = await fetch(`${baseUrl}${opts.url}`, {
      method: opts.method ?? 'GET',
      body: opts.body ?? undefined,
      headers: {
        ...authedHeaders,
        ...(opts.config?.headers ?? {}),
      },
    });

    if (res.status === 401) return { kind: 'auth' };

    if (!res.ok) {
      let data: any;
      try {
        data = await res.json();
      } catch {
        data = { message: 'Service error' };
      }
      return { kind: 'fail', status: res.status, data };
    }

    return {
      kind: 'ok',
      result: {
        status: res.status,
        body: res.body,
        contentType: res.headers.get('content-type') ?? 'application/octet-stream',
      },
    };
  });

  if (!result.ok) {
    return { status: result.status, data: result.data };
  }

  return {
    status: result.result.status,
    body: result.result.body,
    contentType: result.result.contentType,
    setCookie: result.setCookieFromRefresh,
  };
}

export function applySetCookie(
  res: NextResponse,
  setCookie: string | string[] | undefined,
): NextResponse {
  if (!setCookie) return res;

  if (Array.isArray(setCookie)) {
    for (const c of setCookie) res.headers.append('set-cookie', c);
  } else {
    res.headers.set('set-cookie', setCookie);
  }

  return res;
}
