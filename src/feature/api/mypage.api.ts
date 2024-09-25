import { Server } from '@/feature/api/index';

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

const getUserTags = async () => {
  const result = await Server.get(`users/tags`);
  const data: UserTagsResponse[] = result.data.data;

  return data;
};

const getUserFollowers = async () => {
  const result = await Server.get(`users/my/follows`);
  const data: UserFollowInfoResponse[] = result.data.data;
  console.log('팔로워: ', result.data.data);

  return data;
};

const getUserFollowings = async () => {
  const result = await Server.get('users/my/followings');
  const data: UserFollowInfoResponse[] = result.data.data;
  console.log('팔로잉: ', result.data.data);

  return data;
};

const getUserArtworks = async () => {
  const result = await Server.get('artworks/my');
  console.log(result);

  return result;
};

const getUserFeeds = async () => {
  const result = await Server.get('posts/feeds/my');
  const data: UserFeedsResponse[] = result.data.data;
  console.log(data);

  return data;
};

const getPostsDetail = async (feedId: number) => {
  const result = await Server.get(`posts/feeds/${feedId}`);
  const data: UserFeedsResponse = result.data.data;
  console.log(data);

  return data;
};

export {
  getUserTags,
  getUserFollowers,
  getUserFollowings,
  getUserArtworks,
  getUserFeeds,
  getPostsDetail,
};
