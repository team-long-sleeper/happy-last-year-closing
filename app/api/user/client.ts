import { User, UserDataResponse } from '@type/user.types';
import { bffClient } from '@/lib/axios/instances';

class UserService {
  async getProfile(): Promise<UserDataResponse> {
    return await bffClient.get('/user/profile').then((response) => User.parse(response.data));
  }

  async postLogout() {
    return await bffClient.post('/user/logout').then((response) => response.data);
  }

  async deleteAccount(): Promise<void> {
    return await bffClient.delete(`/user/account`);
  }
}

const userService = new UserService();

export default userService;
