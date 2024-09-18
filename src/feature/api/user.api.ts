import { addAccessTokenToServer, makeQuery, Server } from '@/feature/api/index';

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
  const { data } = result.data;
  const {accessToken} = data;
  addAccessTokenToServer(accessToken);
  return result.data;
};

const checkNicknameAPI = async (nickname: string) => {
  const result = await Server.get(`users/nickname/check${makeQuery({nickname})}`);
  const { data } = result.data;
  return data;
};

const updateUserInfoAPI = async(userInfo: FormData) => {
  const result = await Server.put('users/my', userInfo, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  const { data } = result.data;
  return data;
}

const updateUserInterestAPI = async(interest: Array<Record<string, string>>) => {
  const result = await Server.post('users/preferred-category', interest);
  const { data } = result.data;
  return data;
}

const getMyInfoAPI = async () => {
  const result = await Server.get('users/my');
  const { data }: {data: UserResponse} = result.data;
  return data;
};

export {
  refreshAPI,
  joinAPI,
  loginAPI,
  checkNicknameAPI,
  updateUserInfoAPI,
  updateUserInterestAPI,
  getMyInfoAPI,
};
