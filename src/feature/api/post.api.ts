import { Server } from '@/feature/api/index';

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

export {
  createFeedAPI,
  createPickAPI
}
