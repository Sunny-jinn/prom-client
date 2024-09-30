import { Post, User } from '@/feature/types/index';

type PostType = 'FEED' | 'PICK';
type PostCategory = 'MUSIC' | 'VISUAL' | 'WRITING';
type PostFeed = {
  postId: number;
  type: Post.PostCategory;
  description: string;
  title: string;
  commentCounts: number;
  likesCount: number;
  url: string[];
  user: User.User;
  createdAt: string
};

type PostPick = {
  shortFormId: number;
  thumbnailUrl: string;
  videoUrl: string;
  type: string;
  title: string;
  likeCounts: number;
  description: string;
  commentCounts: number;
  user: User.User;
};

type FeedComment = {
  commentId: number;
  comment: string;
  userId: number;
  userName: string;
  profileImage: string;
  createdAt: string;
  parentCommentId: number;
};

type PickComment = {
  commentId: number;
  comment: string;
  userId: number;
  userName: string;
  profileImage: string;
  createdAt: string;
  parentCommentId: number;
};

export type { PostType, PostCategory, PostFeed, PostPick, FeedComment, PickComment };
