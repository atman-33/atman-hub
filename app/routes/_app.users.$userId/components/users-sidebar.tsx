import type { User } from '@prisma/client';
import { UserAvatar } from '~/components/shared/user-avatar';

interface UsersSidebarProps {
  user: Omit<User, 'password'> | undefined;
}

export const UsersSidebar = ({ user }: UsersSidebarProps) => {
  return (
    <div>
      <div className="flex items-center gap-x-4">
        <UserAvatar user={user} />
        <div className="font-bold">{user?.name}</div>
      </div>
      <div className="flex flex-col gap-y-4 py-8">
        <div>📝Posts</div>
        <div>📱Apps</div>
      </div>
    </div>
  );
};
