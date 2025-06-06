import type { User } from '@prisma/client';
import { createCookieSessionStorage } from 'react-router';
import type { ToastType } from './components/shadcn/custom/custom-sonner';
import { env } from './config/env';

/**
 * セッションデータ。認証で利用する。
 */
type SessionData = {
  user: Omit<User, 'password'>;
};

/**
 * セッションフラッシュメッセージ。トースト表示で利用する。
 */
type SessionFlashData = {
  toast: {
    type: ToastType;
    message: string;
    data?: {
      duration?: number;
      description?: string;
    };
  };
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1, // 単位: 秒
      path: '/',
      sameSite: 'lax',
      secrets: [env.SESSION_SECRET || ''],
      secure: process.env.NODE_ENV === 'production',
    },
  });

export { commitSession, destroySession, getSession };
