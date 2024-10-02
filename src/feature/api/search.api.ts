import { Server, makeQuery } from '@/feature/api/index';

const searchUser = async (name: string) => {
  const result = await Server.get(`users${makeQuery({ name })}`);
  const data = result.data.data;

  return data;
};

export { searchUser };
