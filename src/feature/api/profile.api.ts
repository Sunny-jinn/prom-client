import { Server } from '@/feature/api/index';
import { User } from '../types';
import { PostPick } from '../types/Post.type';
import { UserArtworksResponse, UserFeedsResponse, UserFollowInfoResponse } from './mypage.api';

const getUserProfileAPI = async (userId: string) => {
  const result = await Server.get(`users/${userId}`);
  const data: User.BaseUser = result.data.data;
  console.log(result);

  return data;
};

const getUserProfileFeedsAPI = async (userId: string) => {
  const result = await Server.get(`posts/feeds/users/${userId}`);
  const data: UserFeedsResponse[] = result.data.data;
  console.log(result);
  return data;
};

const getUserProfilePicksAPI = async (userId: string) => {
  const result = await Server.get(`posts/short-forms/users/${userId}`);
  const data: PostPick[] = result.data.data;
  console.log(result);
  return data;
};

const getUserProfileArtworksAPI = async (userId: string) => {
  // const result = await Server.get(`artworks/${userId}`);
  const result = await Server.get(`artworks`, {
    params: { userId },
  });
  const data: UserArtworksResponse[] = result.data.data;
  console.log(result);
  return data;
};

const getUserProfileFollowers = async (userId: string) => {
  const result = await Server.get(`users/${userId}/follows`);
  const data: UserFollowInfoResponse[] = result.data.data;

  return data;
};

const getUserProfileFollowings = async (userId: string) => {
  const result = await Server.get(`users/${userId}/followings`);
  const data: UserFollowInfoResponse[] = result.data.data;

  return data;
};

export {
  getUserProfileArtworksAPI,
  getUserProfileFollowings,
  getUserProfileAPI,
  getUserProfileFeedsAPI,
  getUserProfilePicksAPI,
  getUserProfileFollowers,
};
