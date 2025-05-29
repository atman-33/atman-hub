import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';

const editPostFormSchema = z.object({
  emoji: z
    .string({ required_error: 'Emoji is required' })
    .refine(
      (emoji: string) => Array.from(emoji).length === 1,
      'Emoji must be a single character',
    ),
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title must be at least 1 character long')
    .max(255, 'Title must be at most 255 characters long'),
  content: z.string().optional(),
});

const useEditPostForm = () => {
  const form = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editPostFormSchema });
    },
  });

  return form;
};

export { editPostFormSchema, useEditPostForm };
