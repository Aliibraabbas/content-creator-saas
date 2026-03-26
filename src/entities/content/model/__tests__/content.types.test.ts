import { describe, it, expect } from 'vitest'
import { createContentSchema, updateContentSchema } from '../content.types'

describe('Content Zod Schemas', () => {
  describe('createContentSchema', () => {
    it('should validate correct content input with all fields', () => {
      const validInput = {
        title: 'My Blog Post',
        description: 'A great article about TypeScript',
        content_url: 'https://example.com/blog/typescript',
      }

      const result = createContentSchema.safeParse(validInput)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validInput)
      }
    })

    it('should fail when title is empty string', () => {
      const invalidInput = {
        title: '',
        content_url: 'https://example.com/blog',
      }

      const result = createContentSchema.safeParse(invalidInput)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title is required')
      }
    })

    it('should fail when title exceeds 200 characters', () => {
      const invalidInput = {
        title: 'a'.repeat(201),
        content_url: 'https://example.com/blog',
      }

      const result = createContentSchema.safeParse(invalidInput)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Title is too long')
      }
    })

    it('should fail when content_url is not a valid URL', () => {
      const invalidInput = {
        title: 'My Blog Post',
        content_url: 'not-a-valid-url',
      }

      const result = createContentSchema.safeParse(invalidInput)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Must be a valid URL')
      }
    })
  })

  describe('updateContentSchema', () => {
    it('should validate partial update with only title', () => {
      const validInput = {
        title: 'Updated Title',
      }

      const result = updateContentSchema.safeParse(validInput)
      expect(result.success).toBe(true)
    })
  })
})
