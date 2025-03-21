import { Link } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';

const UserPostsPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">📝Posts</h2>
        <Link to="./edit">
          <Button className="ml-4">New post</Button>
        </Link>
      </div>
      <Separator />
    </div>
  );
};

export default UserPostsPage;
