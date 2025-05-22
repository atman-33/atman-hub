import { Form, Outlet } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';
import type { Route } from './+types/route';
import { TagList } from './components/tag-list';

export const loader = async () => {
  const tags = await prisma.tag.findMany({});
  return { tags };
};

const UserTagsLayout = ({ loaderData }: Route.ComponentProps) => {
  const { tags } = loaderData;

  return (
    <div className="flex w-full flex-col gap-4 md:px-12">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">🏷Tags</h2>
        <Form action="new" method="post">
          <Button type="submit" name="_action" value="new" className="ml-4">
            New tag
          </Button>
        </Form>
      </div>
      <Separator />
      <div className="mt-4 flex w-full flex-col items-center justify-center gap-4">
        <TagList tags={tags} />
      </div>
      <Outlet />
    </div>
  );
};

export default UserTagsLayout;
