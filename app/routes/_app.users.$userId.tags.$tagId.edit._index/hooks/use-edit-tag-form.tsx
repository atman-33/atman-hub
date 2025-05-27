import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { z } from 'zod';

const editTagFormSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name must be at least 1 character long')
    .max(50, 'Name must be at most 50 characters long'),
});

const useEditTagForm = () => {
  const form = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: editTagFormSchema });
    },
  });

  return form;
};

export { editTagFormSchema, useEditTagForm };
