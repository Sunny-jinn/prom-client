import { addAccessTokenToServer, Server } from '@/feature/api/index';

type UserResponse = {
  id: number;
  role: 'USER' | 'ARTIST' | 'ARTTY';
  username: string | null,
  description: string | null,
  profileImage: string | null,
  email: string | null,
  birth: string | null,
  phoneNumber: string | null,
  socialType: number | null
}

const refreshAPI = async () => {
  const result = await Server.post('reissue', {}, {
    withCredentials: true,
  });
  console.log(result);
  return result.data;
};

const joinAPI = async ({ email, password }: { email: string, password: string }) => {
  const result = await Server.post('join', {
    email,
    password,
  });
  const {data}: {data: UserResponse} = result.data;
  return data
};

const loginAPI = async ({ email, password }: { email: string, password: string }) => {
  const result = await Server.post('login', {
    email,
    password,
  });
  const { accessToken } = result.data;
  addAccessTokenToServer(accessToken);
  return result.data;
};

const getMyInfoAPI = async () => {
  const result = await Server.get('users/my');
  const { data }: {data: UserResponse} = result.data;

  return data;
};

export {
  refreshAPI,
  joinAPI,
  loginAPI,
  getMyInfoAPI,
};
