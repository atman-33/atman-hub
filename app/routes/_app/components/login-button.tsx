import type { User } from '@prisma/client';
import { Button } from '~/components/shadcn/ui/button';

interface LoginButtonProps {
  user: Omit<User, 'password'> | undefined;
}

export const LoginButton = ({ user }: LoginButtonProps) => {
  return (
    <>
      {user ? (
        user?.image && (
          <img
            src={user.image}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />
        )
      ) : (
        <Button>Login</Button>
      )}
    </>
  );
};
