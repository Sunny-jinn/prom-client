import { Server } from '@/feature/api/index';
import { BaseUser, User } from '../types/User.type';

export type UserTagsResponse = {
  tagId: number;
  name: string;
  isMain: boolean;
};

export type UserFollowInfoResponse = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};

export type UserFeedsResponse = {
  feedId: number;
  commentCounts: number;
  description: string;
  images: string[];
  likeCounts: number;
  title: string;
  type: 'VISUAL' | 'MUSIC' | 'WRITING';
};

export type UserArtworksResponse = {
  id: number;
  userId: number;
  name: string;
  imageUrl: string;
  feedImageList: string[];
  shortFormList: string[];
};

const getUserTags = async () => {
  const result = await Server.get(`users/tags`);
  const data: UserTagsResponse[] = result.data.data;

  return data;
};

const getUserFollowers = async () => {
  const result = await Server.get(`users/my/follows`);
  const data: UserFollowInfoResponse[] = result.data.data;

  return data;
};

const getUserFollowings = async () => {
  const result = await Server.get('users/my/followings');
  const data: UserFollowInfoResponse[] = result.data.data;

  return data;
};

const getUserArtworks = async () => {
  const result = await Server.get('artworks/my');
  const data: UserArtworksResponse[] = result.data.data;

  return data;
};

const getUserFeeds = async () => {
  const result = await Server.get('posts/feeds/my');
  const data: UserFeedsResponse[] = result.data.data;

  return data;
};

const getPostsDetail = async (feedId: string) => {
  const result = await Server.get(`posts/feeds/${feedId}`);
  const data: UserFeedsResponse = result.data.data;
  console.log(data);

  return data;
};

export type UpdateUser = Omit<User, 'socialType' | 'id'> &
  Omit<BaseUser, 'email'> & { backgroundImage: string };

const updateUserInfo = async ({
  description,
  profileImage,
  birth,
  phoneNumber,
  username,
  backgroundImage,
  role,
}: UpdateUser) => {
  const result = await Server.put(`users/my`, {
    description,
    profileImage,
    birthDate: birth,
    phoneNumber,
    nickname: username,
    backgroundImage,
    role,
  });

  return result;
};

export {
  getUserTags,
  getUserFollowers,
  getUserFollowings,
  getUserArtworks,
  getUserFeeds,
  getPostsDetail,
  updateUserInfo,
};
