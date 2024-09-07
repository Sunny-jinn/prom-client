import { create } from 'zustand';

//TODO: 위치 변경될수도
export type User = {
  email: string;
  username: string;
  profileImage: string;
  role: 'USER' | 'ARTIST' | 'ARTTY';
}

interface IUserStore {
  user: User | null;
  setUser: (user: User) => void;
}

const userStore = create<IUserStore>((set) => ({
  user   : null,
  setUser: (user) => set({ user }),
}));

export default userStore;
