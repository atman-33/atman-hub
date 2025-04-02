import { Form } from 'react-router';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';

const UserPostsPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">📝Posts</h2>
        <Form action="new" method="post">
          <Button type="submit" name="_action" value="new" className="ml-4">
            New post
          </Button>
        </Form>
      </div>
      <Separator />
    </div>
  );
};

export default UserPostsPage;
