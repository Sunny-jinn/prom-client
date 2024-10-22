import { Server } from '@/feature/api/index';
import { PostPick } from '../types/Post.type';
import { BaseUser, User } from '../types/User.type';

export type UserTagsResponse = {
  tagId?: number;
  tagName?: string;
  name?: string;
  isMain: boolean;
  idx?: number;
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
  createdAt: string;
  images: string[];
  likeCounts: number;
  title: string;
  type: 'VISUAL' | 'MUSIC' | 'WRITING';
  user: User;
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

const getUserPicks = async () => {
  const result = await Server.get(`posts/short-forms/my`);
  const data: PostPick[] = result.data.data;
  console.log(data);

  return data;
};

const createUserTags = async (arr: UserTagsResponse[]) => {
  const result = await Server.post(`users/tags`, arr);
  console.log(result);

  return result;
};

const deleteUserTags = async (tagIds: number[]) => {
  try {
    const deletePromises = tagIds.map((tagId) => Server.delete(`users/tags/${tagId}`)); // 각 tagId에 대해 개별적으로 DELETE 요청
    const result = await Promise.all(deletePromises); // 모든 DELETE 요청이 완료될 때까지 기다림
    return result;
  } catch (error) {
    console.error('Error deleting tags:', error); // 오류 처리
  }
};

const updateUserTags = async (tagIds: UserTagsResponse[]) => {
  try {
    const deletePromises = tagIds.map((tagId) =>
      Server.put(`users/tags/${tagId.tagId}`, {
        tagName: tagId.tagName,
      }),
    ); // 각 tagId에 대해 개별적으로 DELETE 요청
    const result = await Promise.all(deletePromises); // 모든 DELETE 요청이 완료될 때까지 기다림
    return result;
  } catch (error) {
    console.error('Error deleting tags:', error); // 오류 처리
  }
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
  getUserPicks,
  createUserTags,
  deleteUserTags,
  updateUserTags,
};
