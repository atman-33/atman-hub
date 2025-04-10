import { useCallback, useState } from 'react';
import { Button } from '~/components/shadcn/ui/button';
import { useMarkdownEditor } from './hooks/use-markdown-editor';

const DemoMarkdownEditorPage = () => {
  const [doc, setDoc] = useState<null | string>(null);

  const save = useCallback(() => {
    console.log('doc saved: ', doc);
  }, [doc]);

  const { editor } = useMarkdownEditor({
    doc,
    setDoc,
    save,
  });

  return (
    <>
      <div ref={editor} className="rounded-md border" />
      <Button onClick={save} className="mt-4">
        Save
      </Button>
    </>
  );
};

export default DemoMarkdownEditorPage;
