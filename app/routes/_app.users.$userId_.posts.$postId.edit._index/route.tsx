import { getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useCallback, useRef, useState } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, redirect, useFetcher, useSubmit } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { Button } from '~/components/shadcn/ui/button';
import { Label } from '~/components/shadcn/ui/label';
import { Switch } from '~/components/shadcn/ui/switch';
import { Textarea } from '~/components/shadcn/ui/textarea';
import { ConformInput } from '~/components/shared/conform/conform-input';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';
import {
  editPostFormSchema,
  useEditPostForm,
} from './hooks/use-edit-post-form';
import { useMarkdownEditor } from './hooks/use-markdown-editor';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
  });

  // TODO: 取得したポストのAuthorIdとparams.userIdが一致するか確認する処理を追加

  return { userId: params.userId, postId: params.postId, post };
};

export const action = async ({ params, request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: editPostFormSchema });

  // バリデーションエラーの場合
  if (submission.status !== 'success') {
    return {
      success: false,
      message: 'error!',
      submission: submission.reply(),
    };
  }

  // 記事の内容を新規作成または更新
  const postData = Object.fromEntries(formData);
  await prisma.post.upsert({
    where: { id: params.postId },
    update: {
      title: postData.title as string,
      emoji: postData.emoji as string,
      content: postData.content as string,
      authorId: params.userId,
    },
    create: {
      id: params.postId,
      title: postData.title as string,
      emoji: postData.emoji as string,
      content: postData.content as string,
      authorId: params.userId,
    },
  });

  // トーストに表示するメッセージを格納
  const session = await getSession(request.headers.get('Cookie'));
  session.flash('toast', {
    type: 'success',
    message: 'Post content successfully saved!',
  });

  return redirect('.', {
    headers: { 'Set-Cookie': await commitSession(session) },
  });
};

export const EditPostPage = ({
  loaderData,
  actionData,
}: Route.ComponentProps) => {
  const { userId, post } = loaderData;
  const [form, { emoji, title }] = useEditPostForm();
  const fetcher = useFetcher<typeof actionData>();
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  // 記事の内容（content）をMarkdownエディタに表示するためのstate
  const [doc, setDoc] = useState<null | string>(post?.content || null);

  /**
   * Markdownエディタの内容を保存する
   */
  const save = useCallback(() => {
    if (!formRef.current) {
      return;
    }

    // Conformのvalidateを実行
    form.validate();

    // FormDataを作成して、content: doc を追加
    const formData = new FormData(formRef.current);
    formData.set('content', doc || ''); // docの値をcontentフィールドに設定

    submit(formData, {
      method: 'post',
      replace: true,
    });
  }, [doc, submit, form]);

  const { editor } = useMarkdownEditor({
    doc,
    setDoc,
    save,
  });

  return (
    <fetcher.Form
      {...getFormProps(form)}
      ref={formRef}
      className="flex flex-col"
    >
      <div className="flex justify-between py-4">
        {/* TODO: Buttonとnavigate(-1)を利用する方法に変更する */}
        <Link to={`/users/${userId}/posts`}>
          <IoArrowBackCircle className="h-10 w-10" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="publish" />
            <Label htmlFor="publish">Publish</Label>
          </div>
          {/* NOTE: <button type="button">は、ボタンがフォームを送信するのを防ぐHTMLの方法 */}
          <Button variant="default" type="button">
            Tags
          </Button>
          {/* fetcher処理中（submitting/loading）は disable */}
          <Button
            variant="default"
            type="submit"
            disabled={
              fetcher.state === 'submitting' || fetcher.state === 'loading'
            }
            onClick={(e) => {
              e.preventDefault(); // NOTE: 手動フォーム送信させたいため、ブラウザによるフォーム送信を止める
              save();
            }}
          >
            Save Draft
          </Button>
        </div>
      </div>
      <div className="flex items-baseline gap-4">
        <div className="flex items-baseline gap-2">
          <Label htmlFor="emoji">Emoji:</Label>
          <ConformInput
            metadata={emoji}
            aria-label="Emoji"
            id="emoji"
            name="emoji"
            type="text"
            defaultValue={post?.emoji}
            className="w-12"
          />
        </div>
        <div className="flex flex-1 items-baseline gap-2">
          <Label htmlFor="title">Title:</Label>
          <div className="flex-1">
            <ConformInput
              metadata={title}
              aria-label="Title"
              id="title"
              name="title"
              type="text"
              defaultValue={post?.title}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-4 pt-4">
        <div className="flex-1">
          {/* 記事エディター（div要素を利用しなくてはならない） */}
          <div
            aria-label="Content"
            id="content"
            ref={editor}
            className="rounded-md border"
          />
        </div>
        {/* 記事プレビュー */}
        <Textarea placeholder="Preview" className="flex-1" readOnly />
      </div>
    </fetcher.Form>
  );
};

export default EditPostPage;
