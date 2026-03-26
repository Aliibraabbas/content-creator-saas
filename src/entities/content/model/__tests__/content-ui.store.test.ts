import { describe, it, expect } from 'vitest'
import { filterContents, getFavoriteCount } from '../content-ui.store'
import type { Content } from '../content.types'

describe('Content Business Logic', () => {
  const mockContents: Content[] = [
    {
      id: '1',
      title: 'Introduction to TypeScript',
      description: 'Learn TypeScript basics',
      content_url: 'https://example.com/typescript',
      user_id: 'user-1',
      is_favorite: true,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      title: 'React Hooks Guide',
      description: 'Master React hooks',
      content_url: 'https://example.com/react',
      user_id: 'user-1',
      is_favorite: false,
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    },
    {
      id: '3',
      title: 'Vite Build Tool',
      description: 'Fast build tool for modern web',
      content_url: 'https://example.com/vite',
      user_id: 'user-1',
      is_favorite: true,
      created_at: '2024-01-03T00:00:00Z',
      updated_at: '2024-01-03T00:00:00Z',
    },
  ]

  it('should return all contents when no filters are applied', () => {
    const result = filterContents(mockContents, '', false)
    expect(result).toEqual(mockContents)
    expect(result).toHaveLength(3)
  })

  it('should filter by search query in title (case-insensitive)', () => {
    const result = filterContents(mockContents, 'typescript', false)
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Introduction to TypeScript')
  })

  it('should filter by favorites only', () => {
    const result = filterContents(mockContents, '', true)
    expect(result).toHaveLength(2)
    expect(result.every((content) => content.is_favorite)).toBe(true)
  })

  it('should combine search query and favorites filter', () => {
    const result = filterContents(mockContents, 'typescript', true)
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Introduction to TypeScript')
    expect(result[0].is_favorite).toBe(true)
  })

  it('should count favorite contents correctly', () => {
    const count = getFavoriteCount(mockContents)
    expect(count).toBe(2)
  })
})
