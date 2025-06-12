import { getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { PostStatus } from '@prisma/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Link, Outlet, redirect, useFetcher, useSubmit } from 'react-router';
import { prisma } from '~/.server/lib/prisma-client';
import { showToast } from '~/components/shadcn/custom/custom-sonner';
import { Button } from '~/components/shadcn/ui/button';
import { Label } from '~/components/shadcn/ui/label';
import { Sheet, SheetTrigger } from '~/components/shadcn/ui/sheet';
import { Switch } from '~/components/shadcn/ui/switch';
import { ButtonLink } from '~/components/shared/button-link';
import { ConformInput } from '~/components/shared/conform/conform-input';
import { PostPreview } from '~/components/shared/post-preview/post-preview';
import { commitSession, getSession } from '~/sessions.server';
import type { Route } from './+types/route';
import {
  editPostFormSchema,
  useEditPostForm,
} from './hooks/use-edit-post-form';
import { useMarkdownEditor } from './hooks/use-markdown-editor';
import { useDocStore } from './stores/doc-store';

export const loader = async ({ params }: Route.LoaderArgs) => {
  // NOTE: postがnullの場合、新規作成のため、nullを返すこと。エラーを投げないこと
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
      status: postData.status as PostStatus,
      authorId: params.userId,
    },
    create: {
      id: params.postId,
      title: postData.title as string,
      emoji: postData.emoji as string,
      content: postData.content as string,
      status: postData.status as PostStatus,
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
  const [isPublished, setIsPublished] = useState(
    post?.status === PostStatus.PUBLIC,
  );
  const fetcher = useFetcher<typeof actionData>();
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  // 記事の内容（content）をMarkdownエディタに表示するためのstate
  const doc = useDocStore((state) => state.doc);
  const setDoc = useDocStore((state) => state.setDoc);
  const html = useDocStore((state) => state.docHtml);

  useEffect(() => {
    // 記事の内容（content）をMarkdownエディタに表示するためのstateを更新
    const newContent = post?.content ?? '';
    setDoc(newContent);
  }, [post?.content, setDoc]);

  /**
   * 公開状態のスイッチが変更されたときの処理
   */
  const handlePublishSwitchChange = () => {
    if (!formRef.current) {
      return;
    }

    // NOTE: Conformのvalidateを実行して画面にバリデーションエラーを表示する
    form.validate();

    // NOTE: 実際にバリデーションエラーが発生しているかどうかは、parseWithZodの結果で確認する
    const formData = new FormData(formRef.current);
    const result = parseWithZod(formData, {
      schema: editPostFormSchema,
    });

    if (result.status === 'error') {
      // バリデーションエラーがある場合は、何もせずにトースト表示のみ
      showToast('error', 'Error', {
        description: 'Please fix the errors before publishing.',
      });
      return;
    }

    // console.log('result.payload:', result.payload);
    const nextPublished = !isPublished;
    setIsPublished(nextPublished); // 状態は更新しつつ
    save(nextPublished); // 新しい状態を明示的に渡す
  };

  /**
   * 記事を保存する
   */
  const save = useCallback(
    (published: boolean = isPublished) => {
      if (!formRef.current) {
        return;
      }

      // Conformのvalidateを実行
      form.validate();

      // FormDataを作成して、content: doc を追加
      const formData = new FormData(formRef.current);
      formData.set('content', doc || ''); // docの値をcontentフィールドに設定
      formData.set('status', published ? PostStatus.PUBLIC : PostStatus.DRAFT); // statusフィールドを追加

      submit(formData, {
        method: 'post',
        replace: true,
      });
    },
    [doc, submit, form, isPublished],
  );

  /**
   * 画像をアップロードする
   */
  const imageUpload = useCallback(
    async (file: File, onUploadComplete: (url: string) => void) => {
      try {
        const formData = new FormData();
        formData.set('file', file);
        const res = await fetch('/resource/upload-image', {
          method: 'POST',
          body: formData,
        });
        const json = await res.json();
        // console.log('Upload result:', json);

        if (json.status !== 'success') {
          showToast('error', 'Error', {
            description: `${json.message} (${json.error})`,
          });
          return;
        }
        onUploadComplete(json.url);
      } catch (error) {
        console.error('Image upload failed:', error);
        showToast('error', 'Error', {
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    },
    [],
  );

  const { editor } = useMarkdownEditor({
    doc,
    setDoc,
    save,
    imageUpload,
  });

  return (
    <Sheet>
      <fetcher.Form
        {...getFormProps(form)}
        ref={formRef}
        className="flex flex-col"
      >
        <div className="flex justify-between py-4">
          <Link to={`/users/${userId}/posts`}>
            <IoArrowBackCircle className="h-10 w-10" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="publish"
                checked={isPublished}
                onCheckedChange={() => handlePublishSwitchChange()}
                className="hover:cursor-pointer"
              />
              <Label htmlFor="publish">Publish</Label>
            </div>
            <SheetTrigger asChild>
              <Button asChild>
                <ButtonLink to="./tags" replace>
                  Tags
                </ButtonLink>
              </Button>
            </SheetTrigger>
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
              Save
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
          <PostPreview html={html} className="flex-1" />
        </div>
      </fetcher.Form>
      <Outlet />
    </Sheet>
  );
};

export default EditPostPage;
