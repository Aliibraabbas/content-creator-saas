import { useParams, useNavigate } from 'react-router-dom'
import { useContent } from '@entities/content'
import { ContentUpdateForm } from '@features/content-update/ui/content-update-form'
import { Button } from '@shared/ui'

export function ContentEditPage() {
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
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Edit Content</h1>
            <Button variant="secondary" onClick={() => navigate(`/content/${content.id}`)}>
              Cancel
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <ContentUpdateForm content={content} />
        </div>
      </main>
    </div>
  )
}
