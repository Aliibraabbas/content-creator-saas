import { z } from 'zod'

export const contentSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().nullable(),
  content_url: z.string().url('Must be a valid URL'),
  user_id: z.string().uuid(),
  is_favorite: z.boolean(),
})

export const createContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().optional(),
  content_url: z.string().url('Must be a valid URL'),
})

export const updateContentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long').optional(),
  description: z.string().nullable().optional(),
  content_url: z.string().url('Must be a valid URL').optional(),
  is_favorite: z.boolean().optional(),
})

export type Content = z.infer<typeof contentSchema>
export type CreateContentInput = z.infer<typeof createContentSchema>
export type UpdateContentInput = z.infer<typeof updateContentSchema>
