import { bffClient } from '@/lib/axios/instances';
import { GetTagResponseType, PostTagBody } from '@type/tag.type';

class TagsService {
  async getTags(): Promise<GetTagResponseType> {
    return await bffClient
      .get('/tags')
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }

  async postTag(data: PostTagBody) {
    return await bffClient
      .post('/tags', data)
      .then((response) => response.data)
      .catch((error) => console.log(error));
  }
}

const tagsService = new TagsService();

export default tagsService;
