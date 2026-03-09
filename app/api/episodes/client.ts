import { bffClient } from '@/lib/axios/instances';
import { CreateEpisodeReq, CreateEpisodeRes } from '@/types/episode.types';

class EpisodeService {
  async createEpisode(episodeBody: CreateEpisodeReq): Promise<CreateEpisodeRes> {
    return await bffClient
      .post('/episodes', { ...episodeBody })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {});
  }

  //   async getEpisodesList()

  // async getEpisode
}

const episodeService = new EpisodeService();

export default episodeService;
