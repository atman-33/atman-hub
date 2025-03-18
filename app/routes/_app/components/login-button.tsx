import type { User } from '@prisma/client';
import { Link, useSubmit } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shadcn/ui/dropdown-menu';
import { AlertDialog } from '~/components/shared/react-call/alert-dialog';
import { UserAvatar } from '~/components/shared/user-avatar';

interface LoginButtonProps {
  user: Omit<User, 'password'> | undefined;
}

export const LoginButton = ({ user }: LoginButtonProps) => {
  const submit = useSubmit();
  const dropdownButtonClass = 'justify-baseline w-full';

  const handleLogout = async () => {
    const res = await AlertDialog.call({
      message: 'Please confirm you want to log out.',
    });

    if (res === 'cancel') {
      return;
    }

    submit(document.createElement('form'), {
      method: 'post',
      action: '/auth/logout',
    });
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:!outline-none">
            <UserAvatar user={user} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={`/users/${user.id}`}>
              <button type="button" className={dropdownButtonClass}>
                <DropdownMenuItem>My page</DropdownMenuItem>
              </button>
            </Link>
            {/* TODO: #16 パスワード変更の処理実装 */}
            <Link to={'/'}>
              <button type="button" className={dropdownButtonClass}>
                <DropdownMenuItem>Change password</DropdownMenuItem>
              </button>
            </Link>
            <DropdownMenuSeparator />
            <button
              type="button"
              className={dropdownButtonClass}
              onClick={() => handleLogout()}
            >
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/auth/login">
          <Button className="h-8 font-bold">Log in</Button>
        </Link>
      )}
    </>
  );
};
