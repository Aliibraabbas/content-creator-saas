import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Input, Form, FormField, FormError } from '@shared/ui'
import { useUpdateContent, updateContentSchema, type UpdateContentInput, type Content } from '@entities/content'
import { useAuthStore, selectUser } from '@features/auth'

interface ContentUpdateFormProps {
  content: Content
}

export function ContentUpdateForm({ content }: ContentUpdateFormProps) {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)
  const { mutate: updateContent, isPending, error } = useUpdateContent(user?.id ?? '')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateContentInput>({
    resolver: zodResolver(updateContentSchema),
    defaultValues: {
      title: content.title,
      description: content.description,
      content_url: content.content_url,
    },
  })

  useEffect(() => {
    reset({
      title: content.title,
      description: content.description,
      content_url: content.content_url,
    })
  }, [content, reset])

  const onSubmit = (data: UpdateContentInput) => {
    updateContent(
      { id: content.id, input: data },
      {
        onSuccess: () => {
          navigate(`/content/${content.id}`)
        },
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Input
          label="Title"
          placeholder="My awesome content"
          error={errors.title?.message}
          {...register('title')}
        />
      </FormField>

      <FormField>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          placeholder="Optional description..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </FormField>

      <FormField>
        <Input
          label="Content URL"
          type="url"
          placeholder="https://example.com/image.jpg"
          error={errors.content_url?.message}
          {...register('content_url')}
        />
      </FormField>

      {error && <FormError message={error.message} />}

      <div className="flex space-y-2">
        <Button type="submit" isLoading={isPending} className="w-full">
          Update Content
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate(`/content/${content.id}`)}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </Form>
  )
}
