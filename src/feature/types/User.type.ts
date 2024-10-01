type BaseUser = {
  id: number;
  role: 'USER' | 'ARTIST' | 'ARTTY';
  username: string;
  profileImage: string;
  email: string;
  description: string;
}

type User = BaseUser & {
  birth: string | null,
  phoneNumber: string | null,
  socialType: number | null,
  backgroundImage: string | null
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
  BaseUser,
  User,
  Follows,
  Followings
};
