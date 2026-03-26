import { useNavigate } from 'react-router-dom'
import { ContentCreateForm } from '@features/content-create/ui/content-create-form'
import { Button } from '@shared/ui'

export function ContentCreatePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Create Content</h1>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <ContentCreateForm />
        </div>
      </main>
    </div>
  )
}
