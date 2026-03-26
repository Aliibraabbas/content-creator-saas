import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Form, FormField, FormError } from '@shared/ui'
import { useLogin, loginSchema, type LoginInput } from '@features/auth'

export function LoginForm() {
  const navigate = useNavigate()
  const { mutate: login, isPending, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginInput) => {
    login(data, {
      onSuccess: () => {
        navigate('/dashboard')
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </FormField>

      <FormField>
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
      </FormField>

      {error && <FormError message={error.message} />}

      <Button type="submit" isLoading={isPending} className="w-full">
        Sign In
      </Button>
    </Form>
  )
}
