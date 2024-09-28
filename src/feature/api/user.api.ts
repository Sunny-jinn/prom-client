import { addAccessTokenToServer, makeQuery, Server } from '@/feature/api/index';
import { User } from '@/feature/types';

const refreshAPI = async () => {
  const result = await Server.post('reissue', {}, {
    withCredentials: true,
  });
  console.log(result);
  return result.data;
};

const joinAPI = async ({ email, password }: { email: string, password: string }): Promise<User.User> => {
  const result = await Server.post('join', {
    email,
    password,
  });
  const {data} = result.data;
  return data
};

const loginAPI = async ({ email, password }: { email: string, password: string }) => {
  const result = await Server.post('login', {
    email,
    password,
  }, {withCredentials: true});
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

const getMyInfoAPI = async (): Promise<User.User> => {
  const result = await Server.get('users/my');
  const { data } = result.data;
  return data;
};

const getUserInfoAPI = async (userId: number): Promise<User.User> => {
  const result = await Server.get(`users/${userId}`);
  const { data } = result.data;
  return data;
};

const getMyFollowingsAPI = async (): Promise<User.Followings> => {
  const result = await Server.get(`users/my/followings`);
  const { data } = result.data;
  return data;
};

const followUserAPI = async (userId: number): Promise<string> => {
  const result = await Server.post(`users/follows`, {
    followUserId: userId
  });
  const { data } = result.data;
  return data;
};

const unFollowUserAPI = async (userId: number): Promise<string> => {
  const result = await Server.delete(`users/follows/${userId}`);
  const { data } = result.data;
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
  getUserInfoAPI,
  getMyFollowingsAPI,
  followUserAPI,
  unFollowUserAPI
};
