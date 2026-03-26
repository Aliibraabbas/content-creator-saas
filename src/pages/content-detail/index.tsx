import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContent } from '@entities/content'
import { FavoriteToggleButton } from '@features/content-favorite/ui/favorite-toggle-button'
import { DeleteContentButton } from '@features/content-delete/ui/delete-content-button'
import { Button } from '@shared/ui'

export function ContentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: content, isLoading } = useContent(id ?? '')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Content not found</p>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Content Details</h1>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {content.title}
              {content.is_favorite && <span className="ml-2 text-blue-600">★</span>}
            </h2>
            <p className="text-sm text-gray-500">
              Created: {new Date(content.created_at).toLocaleDateString()} | 
              Updated: {new Date(content.updated_at).toLocaleDateString()}
            </p>
          </div>

          {content.description && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{content.description}</p>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Content URL</h3>
            <a
              href={content.content_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 break-all"
            >
              {content.content_url}
            </a>
          </div>

          <div className="flex space-y-2 pt-6 border-t border-gray-200">
            <Link to={`/content/${content.id}/edit`} className="flex-1">
              <Button className="w-full">Edit</Button>
            </Link>
            <div className="flex-1">
              <FavoriteToggleButton contentId={content.id} isFavorite={content.is_favorite} />
            </div>
            <div className="flex-1">
              <DeleteContentButton contentId={content.id} contentTitle={content.title} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
