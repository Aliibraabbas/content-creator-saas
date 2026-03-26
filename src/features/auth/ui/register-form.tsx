import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Form, FormField, FormError } from '@shared/ui'
import { useRegister, registerSchema, type RegisterInput } from '@features/auth'

export function RegisterForm() {
  const navigate = useNavigate()
  const { mutate: register, isPending, error } = useRegister()

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterInput) => {
    register(data, {
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
          {...registerField('email')}
        />
      </FormField>

      <FormField>
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...registerField('password')}
        />
      </FormField>

      <FormField>
        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          {...registerField('confirmPassword')}
        />
      </FormField>

      {error && <FormError message={error.message} />}

      <Button type="submit" isLoading={isPending} className="w-full">
        Create Account
      </Button>
    </Form>
  )
}
