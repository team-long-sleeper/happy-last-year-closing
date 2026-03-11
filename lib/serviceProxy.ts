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

// todo METHOD 별로 CLASS 화 할까 ???? axios 쓰는 것처럼
export async function proxyToService(
  req: NextRequest,
  opts: ServiceFetchOpts,
): Promise<{ status: number; data?: any; headers?: any; setCookie?: string | string[] }> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshKey = cookieStore.get('refresh_key');

  const baseHeaders = forwardHeaders(req);

  if (!accessToken) {
    if (refreshKey) {
      const filteredHeaders = Object.entries(opts.config?.headers ?? {}).reduce(
        (acc, [key, value]) => {
          if (typeof value === 'string') acc[key] = value;
          return acc;
        },
        {} as Record<string, string>,
      );

      const refreshed = await tryRefresh({ ...filteredHeaders, ...baseHeaders });

      if (!refreshed.ok) {
        console.log('refreshed  ❌❌❌❌❌');

        return { status: 401, data: refreshed.data };
      }

      const newAccess = getCookieValue(refreshed.setCookie, 'access_token');

      try {
        const resultAgain = await serviceClient.request({
          method: opts.method,
          url: opts.url,
          data: opts.body,
          ...opts.config,
          headers: {
            ...baseHeaders,
            Authorization: `Bearer ${newAccess}`,
            ...(opts.config?.headers ?? {}),
          },
        });

        return {
          status: resultAgain.status,
          data: resultAgain.data,
          headers: resultAgain.headers,
          setCookie: refreshed.setCookie,
        };
      } catch (error: any) {
        const st2 = (error?.response?.status ?? 500) as number;
        return { status: st2, data: error?.response?.data ?? { message: 'Service error' } };
      }
    }

    //access token도 없는데 refresh key도 없어? 로그아웃시키기
    return { status: 401, data: { code: 'AUTH_REQUIRED', message: 'Unauthenticated' } };
  } else {
    try {
      const result = await serviceClient.request({
        method: opts.method,
        url: opts.url,
        data: opts.body,
        ...opts.config,
        headers: {
          ...baseHeaders,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`,
          ...(opts.config?.headers ?? {}),
        },
      });

      return {
        status: result.status,
        data: result.data,
        headers: result.headers,
        setCookie: result.headers['set-cookie'],
      };
    } catch (error: any) {
      const status = (error.response.status ?? 500) as number;

      if (status === 401) {
        const filteredHeaders = Object.entries(opts.config?.headers ?? {}).reduce(
          (acc, [key, value]) => {
            if (typeof value === 'string') acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        );

        const refreshed = await tryRefresh({ ...filteredHeaders, ...baseHeaders });

        if (!refreshed.ok) {
          console.log('refreshed  ❌❌❌❌❌');

          return { status: 401, data: refreshed.data };
        }

        const newAccess = getCookieValue(refreshed.setCookie, 'access_token');

        try {
          const resultAgain = await serviceClient.request({
            method: opts.method,
            url: opts.url,
            data: opts.body,
            ...opts.config,
            headers: {
              ...baseHeaders,
              Authorization: `Bearer ${newAccess}`,
              ...(opts.config?.headers ?? {}),
            },
          });

          return {
            status: resultAgain.status,
            data: resultAgain.data,
            headers: resultAgain.headers,
            setCookie: refreshed.setCookie,
          };
        } catch (error: any) {
          const st2 = (error?.response?.status ?? 500) as number;
          return { status: st2, data: error?.response?.data ?? { message: 'Service error' } };
        }
      }
    }
  }

  return { status: 500, data: { message: 'UNKNOW ERROR' } };
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
