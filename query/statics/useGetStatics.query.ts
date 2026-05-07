import { useQuery } from '@tanstack/react-query';
import { GetStaticsParam } from '@type/statics.type';
import { staticsKeys } from '../key/statics';
import staticsService from '@/app/api/statics/client';

const useGetStaticsQuery = (params: GetStaticsParam) => {
  return useQuery({
    queryKey: staticsKeys.withParam(params),
    queryFn: () => staticsService.getStatics(params),
  });
};

export default useGetStaticsQuery;
