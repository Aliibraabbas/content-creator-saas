import { create } from 'zustand'
import type { Content } from './content.types'

interface ContentUIState {
  searchQuery: string
  showFavoritesOnly: boolean
  setSearchQuery: (query: string) => void
  setShowFavoritesOnly: (show: boolean) => void
  clearFilters: () => void
}

export const useContentUIStore = create<ContentUIState>((set) => ({
  searchQuery: '',
  showFavoritesOnly: false,
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setShowFavoritesOnly: (show) => set({ showFavoritesOnly: show }),
  clearFilters: () => set({ searchQuery: '', showFavoritesOnly: false }),
}))

export const selectSearchQuery = (state: ContentUIState) => state.searchQuery
export const selectShowFavoritesOnly = (state: ContentUIState) => state.showFavoritesOnly

export function filterContents(
  contents: Content[] | undefined,
  searchQuery: string,
  showFavoritesOnly: boolean
): Content[] {
  if (!contents) return []
  
  let filtered = contents
  
  if (showFavoritesOnly) {
    filtered = filtered.filter((content) => content.is_favorite)
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(
      (content) =>
        content.title.toLowerCase().includes(query) ||
        content.description?.toLowerCase().includes(query)
    )
  }
  
  return filtered
}

export function getFavoriteCount(contents: Content[] | undefined): number {
  if (!contents) return 0
  return contents.filter((content) => content.is_favorite).length
}

export function getTotalCount(contents: Content[] | undefined): number {
  return contents?.length ?? 0
}
