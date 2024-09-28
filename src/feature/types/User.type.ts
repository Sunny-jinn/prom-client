type User = {
  id: number;
  role: 'USER' | 'ARTIST' | 'ARTTY';
  username: string | null,
  description: string | null,
  profileImage: string;
  email: string | null,
  birth: string | null,
  phoneNumber: string | null,
  socialType: number | null
}

type FollowResponse = {
  id: number;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
}

type Follows = FollowResponse[];
type Followings = FollowResponse[];

export type {
  User,
  Follows,
  Followings
};
