import { useAuthStore, selectUser, selectUserEmail, useLogout } from '@features/auth'
import { Button } from '@shared/ui'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const user = useAuthStore(selectUser)
  const userEmail = useAuthStore(selectUserEmail)
  const { mutate: logout, isPending } = useLogout()
  const navigate = useNavigate()

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
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button variant="secondary" onClick={handleLogout} isLoading={isPending}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Welcome to Content Creator SaaS!
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {userEmail}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">User ID:</span> {user?.id}
            </p>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              🎉 Authentication is working! Next, we'll build the content CRUD features.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
