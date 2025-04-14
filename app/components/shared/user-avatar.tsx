import type { User } from '@prisma/client';
import { MdAccountCircle } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/ui/avatar';

interface UserAvatarProps {
  user: Omit<User, 'password'> | undefined;
  className?: string;
}

export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      {user?.image ? (
        <>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </>
      ) : (
        <MdAccountCircle className="h-10 w-10 text-primary" />
      )}
    </Avatar>
  );
};
