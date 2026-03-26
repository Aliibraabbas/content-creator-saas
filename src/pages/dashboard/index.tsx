import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useEffect } from 'react'
import { useAuthStore, selectUser, selectUserEmail, useLogout } from '@features/auth'
import { useContents, useContentUIStore, selectSearchQuery, selectShowFavoritesOnly, filterContents, getFavoriteCount, getTotalCount } from '@entities/content'
import { useUserPreferencesStore, selectShowFavoritesOnlyByDefault } from '@entities/user'
import { ContentFilters } from '@features/content-filters/ui/content-filters'
import { ContentList } from '@widgets/content-list/ui/content-list'
import { Button } from '@shared/ui'

export function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)
  const userEmail = useAuthStore(selectUserEmail)
  const { mutate: logout, isPending: isLoggingOut } = useLogout()
  
  const { data: contents, isLoading } = useContents(user?.id ?? '')
  const searchQuery = useContentUIStore(selectSearchQuery)
  const showFavoritesOnly = useContentUIStore(selectShowFavoritesOnly)
  const setShowFavoritesOnly = useContentUIStore((state) => state.setShowFavoritesOnly)
  
  const showFavoritesOnlyByDefault = useUserPreferencesStore(selectShowFavoritesOnlyByDefault)
  
  useEffect(() => {
    if (showFavoritesOnlyByDefault && !showFavoritesOnly) {
      setShowFavoritesOnly(true)
    }
  }, [showFavoritesOnlyByDefault, showFavoritesOnly, setShowFavoritesOnly])
  
  const filteredContents = useMemo(
    () => filterContents(contents, searchQuery, showFavoritesOnly),
    [contents, searchQuery, showFavoritesOnly]
  )
  const favoriteCount = useMemo(() => getFavoriteCount(contents), [contents])
  const totalCount = useMemo(() => getTotalCount(contents), [contents])

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login')
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Content</h1>
              <p className="text-sm text-gray-600 mt-1">{userEmail}</p>
            </div>
            <div className="flex gap-2">
              <Link to="/content/new">
                <Button>Create Content</Button>
              </Link>
              <Link to="/settings">
                <Button variant="secondary">Settings</Button>
              </Link>
              <Button variant="secondary" onClick={handleLogout} isLoading={isLoggingOut}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-600">
                Total: <span className="font-semibold">{totalCount}</span> | 
                Favorites: <span className="font-semibold">{favoriteCount}</span>
              </p>
            </div>
          </div>
          <ContentFilters />
        </div>

        <ContentList contents={filteredContents} isLoading={isLoading} />
      </main>
    </div>
  )
}
