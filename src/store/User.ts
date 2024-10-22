import { create } from 'zustand';
import { User } from '@/feature/types';

interface IUserStore {
  user: User.BaseUser | null;
  setUser: (user: User.BaseUser) => void;
  removeUser: () => void;
}

const userStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
}));

export default userStore;
