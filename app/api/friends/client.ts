import { bffClient } from '@/lib/axios/instances';
import { Mate } from '@/types/mates.types';

interface PostFriendData {
  name: string;
}

class FriendsService {
  async getContacts(): Promise<Mate[]> {
    return await bffClient
      .get('/friends')
      .then((response) => {
        console.log('getContacts', response);
        return response.data;
      })
      .catch((error) => {
        console.log('getContacts', error);
      });
  }

  async postNewFriend(data: PostFriendData) {
    return await bffClient.post('/friends', data);
  }
}
const friendsService = new FriendsService();

export default friendsService;
