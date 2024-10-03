import { Server } from '@/feature/api/index';

export type Notification = {
  id: number;
  text: string;
  userImage: string;
  createdAt: string;
  type: string;
}

const getNotificationsAPI = async (): Promise<Notification[]> => {
  const result = await Server.get(`notifications`);
  const { data } = result.data;
  return data;
};

export {
  getNotificationsAPI,
};
