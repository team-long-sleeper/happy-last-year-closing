import { bffClient } from '@/lib/axios/instances';
import {
  CreateEpisodeRes,
  EpisodeItemRes,
  EpisodeListRes,
  EpisodeReqBody,
  EpisodeUpdateReqBody,
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

  async getEpisode(id: string): Promise<EpisodeItemRes> {
    return await bffClient
      .get(`/episodes/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async deleteEpisode(id: string) {
    return await bffClient
      .delete(`/episodes/${id}`)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async updateEpisode(id: string, episodeBody: EpisodeUpdateReqBody) {
    return await bffClient
      .patch(`/episodes/${id}`, { ...episodeBody })
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
}

const episodeService = new EpisodeService();

export default episodeService;
