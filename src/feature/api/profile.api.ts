import { Server } from '@/feature/api/index';
import { User } from '../types';

const getUserProfileAPI = async (userId: string) => {
  const result = await Server.get(`users/${userId}`);
  const data: User.BaseUser = result.data.data;
  console.log(result);

  return data;
};

export { getUserProfileAPI };
