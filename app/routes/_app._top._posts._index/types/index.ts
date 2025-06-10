import type { PostStatus } from '@prisma/client';

export interface PostWithAuthor {
  id: string;
  title: string;
  emoji: string;
  content: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string;
    image: string | null;
  };
}
