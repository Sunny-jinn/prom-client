import { Server } from '@/feature/api/index';

const generateAIMusicAPI = async (prompt: Record<string, string>) => {
  const response = await Server.post(`ai/music`, {
    ...prompt
  });
  const { data } = response.data;
  const { result } = data;
  return result;
};

const generateAIVisualAPI = async (prompt: Record<string, string>) => {
  const response = await Server.post(`ai/visual`, {
    ...prompt
  });
  const { data } = response.data;
  const { result } = data;
  return result;
};

const generateAIWritingAPI = async (prompt: Record<string, string>) => {
  const response = await Server.post(`ai/writing`, {
    ...prompt
  });
  const { data } = response.data;
  const { result } = data;
  return result;
};

export {
  generateAIMusicAPI,
  generateAIVisualAPI,
  generateAIWritingAPI
}
