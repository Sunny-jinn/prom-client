import { Post, User } from '@/feature/types/index';

type PostType = 'FEED' | 'PICK'
type PostCategory = 'MUSIC' | 'VISUAL' | 'WRITING'
type PostFeed = {
  postId: number
  type: Post.PostCategory
  title: string
  commentCounts: number;
  likesCount: number;
  url: string[];
  user: User.User
}

export type { PostType, PostCategory, PostFeed };
