import { Server, makeQuery } from '@/feature/api/index';

const searchUser = async (name: string) => {
  const result = await Server.get(`users${makeQuery({ name })}`);
  const data = result.data.data;

  return data;
};

export type SearchPostResponse = {
  id: number;
  description: string;
  imageUrl: string;
  title: string;
};

type SearchPostsResponse = {
  feeds: SearchPostResponse[];
  shortForms: SearchPostResponse[];
};

const searchPostAPI = async (title: string) => {
  const result = await Server.get(`posts/search${makeQuery({ title })}`);
  const data: SearchPostsResponse = result.data.data;

  return data;
};

export { searchUser, searchPostAPI };
