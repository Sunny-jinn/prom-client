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

export type {
  User
}
