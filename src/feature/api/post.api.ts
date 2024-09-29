import { Server, makeQuery } from '@/feature/api/index';
import { Post } from '@/feature/types';
import { FeedComment } from '../types/Post.type';

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

const getFeedsAPI = async ({
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
  const result = await Server.get(`posts${makeQuery({ page, size, orderBy, type })}`);
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
  const data: FeedComment[] = result.data.data;
  console.log(data);

  return data;
};

const createCommentAPI = async (feedId: string, body: { content: string }) => {
  const result = await Server.post(`posts/feeds/${feedId}/comments`, body);
  console.log(result);

  return result;
};

export {
  createFeedAPI,
  createPickAPI,
  getFeedByIdAPI,
  getPickByIdAPI,
  getFeedsAPI,
  getPicksAPI,
  getCommentAPI,
  createCommentAPI,
};
