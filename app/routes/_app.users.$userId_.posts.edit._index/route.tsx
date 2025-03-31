import { Button } from '~/components/shadcn/ui/button';
import { Input } from '~/components/shadcn/ui/input';
import { Label } from '~/components/shadcn/ui/label';
import { Textarea } from '~/components/shadcn/ui/textarea';

export const EditPostPage = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-4">
        <Button variant="link">Back</Button>
        <Button variant="default">Save Draft</Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="emoji">Emoji:</Label>
          <Input type="text" id="emoji" className="w-12" />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="title">Title:</Label>
          <Input type="text" id="title" />
        </div>
        <Button variant="default">Tags</Button>
      </div>

      <div className="flex flex-1 gap-4 pt-4">
        <Textarea placeholder="Input" />
        <Textarea placeholder="Preview" readOnly />
      </div>
    </div>
  );
};

export default EditPostPage;
