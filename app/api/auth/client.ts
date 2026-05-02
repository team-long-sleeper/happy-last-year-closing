import { bffClient } from '@/lib/axios/instances';

class AuthService {
  async restoreAccount() {
    return await bffClient.post('/auth/restore-account');
  }

  async expungeAccount() {
    return await bffClient.post('/auth/expunge-account');
  }
}

const authService = new AuthService();

export default authService;
