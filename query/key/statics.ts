import { GetStaticsParam } from '@type/statics.type';

export const staticsKeys = {
  base: [{ scope: 'sumup' }] as const,
  withParam: (params: GetStaticsParam) => [staticsKeys.base[0].scope, params] as const,
};

export type StaticsKeyType = typeof staticsKeys.base;
export type StaticsKeyWithParamsType = typeof staticsKeys.withParam;
