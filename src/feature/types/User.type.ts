type BaseUser = {
  role: 'USER' | 'ARTIST' | 'ARTTY';
  username: string | null,
  profileImage: string;
  email: string | null,
}

type User = BaseUser & {
  id: number;
  description: string | null,
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
  BaseUser,
  User,
  Follows,
  Followings
};
