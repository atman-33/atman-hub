import { MdAccountCircle } from 'react-icons/md';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/ui/avatar';

interface UserAvatarProps {
  user: { id: string; name: string; image: string | null } | undefined;
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
