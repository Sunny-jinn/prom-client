import { makeQuery, Server } from '@/feature/api/index';
import { Post, User } from '@/feature/types';

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

const getPickByIdAPI = async (postId: number) => {
  const result = await Server.get(`posts/short-forms/${postId}`);
  const { data } = result.data;
  return data;
};

type getRecentFeedAPIRequest = {
  page?: number;
  size?: number;
  orderBy?: string;
  type?: Post.PostCategory
}

export type FeedResponse = {
  postId: number
  type: Post.PostCategory
  title: string
  commentCounts: number;
  likesCount: number;
  url: string[];
  user: User.User
}

type getFeedsResponse = FeedResponse[];

const getFeedsAPI = async (request: getRecentFeedAPIRequest): Promise<getFeedsResponse> => {
  const result = await Server.get(`posts${makeQuery(request)}`);
  const { data } = result.data;
  return data;
};

const getShortFormsAPI = async () => {
  const result = await Server.get(`posts/short-forms`);
  const { data } = result.data;
  return data;
};


export {
  createFeedAPI,
  createPickAPI,
  getFeedByIdAPI,
  getPickByIdAPI,
  getFeedsAPI,
  getShortFormsAPI,
};
