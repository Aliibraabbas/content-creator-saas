import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Form, FormField, FormError } from '@shared/ui'
import { useCreateContent, createContentSchema, type CreateContentInput } from '@entities/content'
import { useAuthStore, selectUser } from '@features/auth'

export function ContentCreateForm() {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)
  const { mutate: createContent, isPending, error } = useCreateContent(user?.id ?? '')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateContentInput>({
    resolver: zodResolver(createContentSchema),
  })

  const onSubmit = (data: CreateContentInput) => {
    createContent(data, {
      onSuccess: () => {
        navigate('/dashboard')
      },
    })
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
          Create Content
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/dashboard')}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </Form>
  )
}
