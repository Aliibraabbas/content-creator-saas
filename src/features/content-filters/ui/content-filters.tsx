import { Input, Button } from '@shared/ui'
import { useContentUIStore, selectSearchQuery, selectShowFavoritesOnly } from '@entities/content'

export function ContentFilters() {
  const searchQuery = useContentUIStore(selectSearchQuery)
  const showFavoritesOnly = useContentUIStore(selectShowFavoritesOnly)
  const setSearchQuery = useContentUIStore((state) => state.setSearchQuery)
  const setShowFavoritesOnly = useContentUIStore((state) => state.setShowFavoritesOnly)
  const clearFilters = useContentUIStore((state) => state.clearFilters)

  const hasActiveFilters = searchQuery || showFavoritesOnly

  return (
    <div className="space-y-4">
      <div className="flex space-y-2">
        <Input
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center space-y-2">
        <label className="flex items-center space-y-2">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Show favorites only</span>
        </label>

        {hasActiveFilters && (
          <Button variant="secondary" onClick={clearFilters} className="ml-auto">
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
