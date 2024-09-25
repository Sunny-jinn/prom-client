import { Server, addAccessTokenToServer, makeQuery } from '@/feature/api/index';

const getPosts = async () => {
  const result = await Server.get('posts');
  console.log(result.data);

  return result;
};

const getShortForms = async () => {
  const result = await Server.get('posts/short-forms');
  console.log(result.data);

  return result;
};

export { getPosts, getShortForms };
