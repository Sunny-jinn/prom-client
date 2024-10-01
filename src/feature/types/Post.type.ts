import { User } from '@/feature/types/index';

type PostType = 'FEED' | 'PICK';
type PostCategory = 'MUSIC' | 'VISUAL' | 'WRITING';

//getFeedsAndPicks Response
type PostCommon = {
  postId: number;
  type: PostCategory
  title: string
  description: string;
  commentCounts: number
  likesCount: number;
  url: string[]
  createdAt: string;
  user: User.User;

}

type PostFeed = {
  feedId: number;
  title: string;
  images: string[]
  likeCounts: number
  commentCounts: number;
  description: string;
  type: PostCategory
  user: User.User
  createdAt: string;
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

export type { PostType, PostCategory, PostCommon, PostFeed, PostPick, FeedComment, PickComment };
