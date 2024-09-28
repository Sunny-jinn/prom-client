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

type PostPick = {
  shortFormId: number;
  thumbnailUrl: string;
  videoUrl: string;
  type: string;
  title: string;
  likeCounts: number;
  description: string;
  commentCounts: number;
  user: User.User
}

export type { PostType, PostCategory, PostFeed, PostPick };
