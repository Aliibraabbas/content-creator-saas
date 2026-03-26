import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContentFilters } from '../content-filters'
import { useContentUIStore } from '@entities/content'

describe('ContentFilters Component', () => {
  beforeEach(() => {
    useContentUIStore.getState().clearFilters()
  })

  it('should update store when user types in search input', async () => {
    const user = userEvent.setup()
    render(<ContentFilters />)

    const searchInput = screen.getByPlaceholderText(/search by title or description/i)
    await user.type(searchInput, 'typescript')

    expect(useContentUIStore.getState().searchQuery).toBe('typescript')
  })

  it('should update store when user toggles favorites checkbox', async () => {
    const user = userEvent.setup()
    render(<ContentFilters />)

    const checkbox = screen.getByRole('checkbox', { name: /show favorites only/i })
    expect(useContentUIStore.getState().showFavoritesOnly).toBe(false)

    await user.click(checkbox)
    expect(useContentUIStore.getState().showFavoritesOnly).toBe(true)
  })
})
