import { GetStaticsParam, GetStaticsResData } from '../../../types/statics.type';
import { bffClient } from '@/lib/axios/instances';

class StaticsService {
  async getSumUp(params: GetStaticsParam): Promise<GetStaticsResData> {
    return await bffClient
      .get('/statics', { params })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

const staticsService = new StaticsService();

export default staticsService;
