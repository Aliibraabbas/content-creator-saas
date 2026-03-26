import { supabase } from '@shared/api'
import type { CreateContentInput, UpdateContentInput } from '../model/content.types'
import type { Inserts, Updates } from '@shared/api/database.types'

export const contentApi = {
  async getAll(userId: string) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async create(userId: string, input: CreateContentInput) {
    const insertData: Inserts<'content'> = {
      title: input.title,
      content_url: input.content_url,
      description: input.description || null,
      user_id: userId,
    }

    const { data, error } = await supabase
      .from('content')
      .insert(insertData)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, input: UpdateContentInput) {
    const updateData: Updates<'content'> = {
      ...input,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  async toggleFavorite(id: string, isFavorite: boolean) {
    const updateData: Updates<'content'> = {
      is_favorite: isFavorite,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('content')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
