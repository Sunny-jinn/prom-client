import { create } from 'zustand';
import { UserFollowInfoResponse } from '@/feature/api/mypage.api';

interface IFollowerStore {
  follower: UserFollowInfoResponse[];
  following: UserFollowInfoResponse[];
  setFollower: (follower: UserFollowInfoResponse[]) => void;
  setFollowing: (following: UserFollowInfoResponse[]) => void;
}

const followerStore = create<IFollowerStore>((set) => ({
  follower: [],
  following: [],
  setFollower: (follower) => set({ follower }),
  setFollowing: (following) => set({ following }),
}));

export default followerStore;
