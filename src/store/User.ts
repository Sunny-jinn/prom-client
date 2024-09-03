import { create } from 'zustand';

//TODO: 위치 변경될수도
export type User = {
  email: string;
  nickname: string;
  profile_image: string;
  role: 'ARTIST' | 'USER';
  status: number; // 0: 회원가입 완료, 프로필 세팅 x 1: 모두 완료
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
