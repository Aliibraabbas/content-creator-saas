import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PreferencesForm } from '../preferences-form'
import { useUserPreferencesStore } from '@entities/user'

describe('PreferencesForm Component', () => {
  beforeEach(() => {
    useUserPreferencesStore.getState().resetPreferences()
    vi.clearAllMocks()
  })

  it('should render form with all fields', () => {
    render(<PreferencesForm />)

    expect(screen.getByLabelText(/theme/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/default view mode/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/show favorites only by default/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save preferences/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reset to defaults/i })).toBeInTheDocument()
  })

  it('should update store when user changes preferences and submits', async () => {
    const user = userEvent.setup()
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<PreferencesForm />)

    const themeSelect = screen.getByLabelText(/theme/i)
    const viewModeSelect = screen.getByLabelText(/default view mode/i)
    const favoritesCheckbox = screen.getByLabelText(/show favorites only by default/i)

    await user.selectOptions(themeSelect, 'light')
    await user.selectOptions(viewModeSelect, 'grid')
    await user.click(favoritesCheckbox)

    const submitButton = screen.getByRole('button', { name: /save preferences/i })
    await user.click(submitButton)

    const state = useUserPreferencesStore.getState()
    expect(state.theme).toBe('light')
    expect(state.defaultViewMode).toBe('grid')
    expect(state.showFavoritesOnlyByDefault).toBe(true)

    alertMock.mockRestore()
  })

  it('should reset preferences to defaults when reset button is clicked', async () => {
    const user = userEvent.setup()
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    useUserPreferencesStore.getState().updatePreferences({
      theme: 'dark',
      defaultViewMode: 'grid',
      showFavoritesOnlyByDefault: true,
    })

    render(<PreferencesForm />)

    const resetButton = screen.getByRole('button', { name: /reset to defaults/i })
    await user.click(resetButton)

    const state = useUserPreferencesStore.getState()
    expect(state.theme).toBe('system')
    expect(state.defaultViewMode).toBe('list')
    expect(state.showFavoritesOnlyByDefault).toBe(false)

    alertMock.mockRestore()
  })
})
