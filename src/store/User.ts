import { create } from 'zustand';
import { User } from '@/feature/types';

interface IUserStore {
  user: User.User | null;
  setUser: (user: User.User) => void;
}

const userStore = create<IUserStore>((set) => ({
  user   : null,
  setUser: (user) => set({ user }),
}));

export default userStore;
