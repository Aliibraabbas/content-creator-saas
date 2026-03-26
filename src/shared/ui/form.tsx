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

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function FormLabel({ children, className = '', ...props }: FormLabelProps) {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} {...props}>
      {children}
    </label>
  )
}

interface FormMessageProps {
  children: React.ReactNode
}

export function FormMessage({ children }: FormMessageProps) {
  return <p className="text-sm text-red-600 mt-1">{children}</p>
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
