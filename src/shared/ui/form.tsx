import type { FormHTMLAttributes } from 'react'

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export function Form({ children, className = '', ...props }: FormProps) {
  return (
    <form className={`space-y-4 ${className}`} {...props}>
      {children}
    </form>
  )
}

interface FormFieldProps {
  children: React.ReactNode
}

export function FormField({ children }: FormFieldProps) {
  return <div className="space-y-1">{children}</div>
}

interface FormErrorProps {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null
  
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  )
}
