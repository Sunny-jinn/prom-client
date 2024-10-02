import { Server, makeQuery } from '@/feature/api/index';
import { Post } from '@/feature/types';

const createFeedAPI = async (formData: FormData) => {
  const result = await Server.post('posts/feeds', formData);
  const { data } = result.data;
  return data;
};

const createPickAPI = async (formData: FormData) => {
  const result = await Server.post('posts/short-forms', formData);
  const { data } = result.data;
  return data;
};

const getFeedByIdAPI = async (postId: number) => {
  const result = await Server.get(`posts/feeds/${postId}`);
  const { data } = result.data;
  return data;
};

const getPickByIdAPI = async (pickId: number): Promise<Post.PostPick> => {
  const result = await Server.get(`posts/short-forms/${pickId}`);
  const { data } = result.data;
  return data;
};

const getFeedsAndPicksAPI = async (
  {
    page,
    size,
    orderBy,
    type,
  }: {
    page?: number;
    size?: number;
    orderBy?: string;
    type?: Post.PostCategory;
  }): Promise<Post.PostCommon[]> => {
  const result = await Server.get(`posts${makeQuery({ page, size, orderBy, type })}`);
  const { data } = result.data;
  return data;
};

const getFeedsAPI = async (
  {
    page,
    size,
    orderBy,
    type,
  }: {
    page?: number;
    size?: number;
    orderBy?: string;
    type?: Post.PostCategory;
  }): Promise<Post.PostFeed[]> => {
  const result = await Server.get(`posts/feeds${makeQuery({ page, size, orderBy, type })}`);
  const { data } = result.data;
  return data;
};

const getPicksAPI = async () => {
  const result = await Server.get(`posts/short-forms`);
  const { data } = result.data;
  return data;
};

const getCommentAPI = async (feedId: string) => {
  const result = await Server.get(`posts/feeds/${feedId}/comments`);
  const data: Post.FeedComment[] = result.data.data;
  console.log(data);

  return data;
};

const getPickCommentAPI = async (pickId: number): Promise<Post.PickComment[]> => {
  const result = await Server.get(`posts/short-forms/${pickId}/comments`);
  const data: Post.PickComment[] = result.data.data;
  console.log(data);

  return data;
};

const createCommentAPI = async (feedId: string, body: { content: string }) => {
  const result = await Server.post(`posts/feeds/${feedId}/comments`, body);
  console.log(result);
  return result;
};

const createPickCommentAPI = async (pickId: number, body: { content: string }) => {
  const result = await Server.post(`posts/short-forms/${pickId}/comments`, body);
  const { data } = result.data;
  return data;
};

const getFeedLikesCheckAPI = async (feedId: number): Promise<boolean> => {
  const result = await Server.get(`posts/feeds/${feedId}/likes/check`);
  const { data } = result.data;
  const { exist } = data;
  return exist;
};

const feedMarkLikeAPI = async (feedId: number) => {
  const result = await Server.post(`posts/feeds/${feedId}/likes`);
  const { data } = result.data;
  const { exist } = data;
  return exist;
};

const feedMarkUnLikeAPI = async (feedId: number) => {
  const result = await Server.delete(`posts/feeds/${feedId}/likes`);
  const { data } = result.data;
  const { exist } = data;
  return exist;
};

const getPickLikesCheckAPI = async (pickId: number): Promise<boolean> => {
  const result = await Server.get(`posts/short-forms/${pickId}/likes/check`);
  const { data } = result.data;
  const { exist } = data;
  return exist;
};

const pickMarkLikeAPI = async (pickId: number) => {
  const result = await Server.post(`posts/short-forms/${pickId}/likes`);
  const { data } = result.data;
  const { exist } = data;
  return exist;
};

const pickMarkUnLikeAPI = async (pickId: number) => {
  const result = await Server.delete(`posts/short-forms/${pickId}/likes`);
  const { data } = result.data;
  const { exist } = data;
  return exist;
};

export {
  createFeedAPI,
  createPickAPI,
  getFeedByIdAPI,
  getPickByIdAPI,
  getFeedsAndPicksAPI,
  getFeedsAPI,
  getPicksAPI,
  getCommentAPI,
  getPickCommentAPI,
  createCommentAPI,
  getFeedLikesCheckAPI,
  feedMarkLikeAPI,
  feedMarkUnLikeAPI,
  getPickLikesCheckAPI,
  pickMarkLikeAPI,
  pickMarkUnLikeAPI,
  createPickCommentAPI,
};
