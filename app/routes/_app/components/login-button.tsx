import type { User } from '@prisma/client';
import { MdAccountCircle } from 'react-icons/md';
import { Link, useSubmit } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '~/components/shadcn/ui/avatar';
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

interface LoginButtonProps {
  user: Omit<User, 'password'> | undefined;
}

export const LoginButton = ({ user }: LoginButtonProps) => {
  const submit = useSubmit();

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
            <Avatar>
              {user.image ? (
                <>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </>
              ) : (
                <MdAccountCircle className="h-10 w-10 text-primary" />
              )}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <DropdownMenuLabel>{user.name} さん</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* TODO: マイページの処理実装 */}
            <Link to={'/'}>
              <button type="button" className="justify-baseline w-full">
                <DropdownMenuItem>My page</DropdownMenuItem>
              </button>
            </Link>
            {/* TODO: パスワード変更の処理実装 */}
            <Link to={'/'}>
              <button type="button" className="justify-baseline w-full">
                <DropdownMenuItem>Change password</DropdownMenuItem>
              </button>
            </Link>
            <DropdownMenuSeparator />
            {/* TODO: ログアウト処理実装 */}
            <button
              type="button"
              className="justify-baseline w-full"
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
