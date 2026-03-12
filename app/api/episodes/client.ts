import { bffClient } from '@/lib/axios/instances';
import {
  CheckTodayRes,
  CreateEpisodeRes,
  EpisodeListRes,
  EpisodeReqBody,
  EpisodeResType,
} from '@/types/episode.types';

class EpisodeService {
  async createEpisode(episodeBody: EpisodeReqBody): Promise<CreateEpisodeRes> {
    return await bffClient
      .post('/episodes', { ...episodeBody })
      .then((response) => response.data)
      .catch((error) => {});
  }

  async getEpisodesList(): Promise<EpisodeListRes> {
    return await bffClient
      .get('/episodes')
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getEpisode(id: string): Promise<EpisodeResType> {
    return await bffClient
      .get(`/episodes/:${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async getTodayCheck(): Promise<CheckTodayRes> {
    return await bffClient
      .get('/episodes/checkToday')
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
}

const episodeService = new EpisodeService();

export default episodeService;
