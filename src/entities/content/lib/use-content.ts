import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contentApi } from '../api/content.api'
import type { CreateContentInput, UpdateContentInput } from '../model/content.types'

export const CONTENT_KEYS = {
  all: (userId: string) => ['contents', userId] as const,
  detail: (id: string) => ['content', id] as const,
}

export function useContents(userId: string) {
  return useQuery({
    queryKey: CONTENT_KEYS.all(userId),
    queryFn: () => contentApi.getAll(userId),
    enabled: !!userId,
  })
}

export function useContent(id: string) {
  return useQuery({
    queryKey: CONTENT_KEYS.detail(id),
    queryFn: () => contentApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateContent(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateContentInput) => contentApi.create(userId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.all(userId) })
    },
  })
}

export function useUpdateContent(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateContentInput }) =>
      contentApi.update(id, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.all(userId) })
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.detail(data.id) })
    },
  })
}

export function useDeleteContent(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => contentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.all(userId) })
    },
  })
}

export function useToggleFavorite(userId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) =>
      contentApi.toggleFavorite(id, isFavorite),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.all(userId) })
      queryClient.invalidateQueries({ queryKey: CONTENT_KEYS.detail(data.id) })
    },
  })
}
