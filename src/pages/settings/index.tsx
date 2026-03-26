import { useNavigate } from 'react-router-dom'
import { useAuthStore, selectUser, selectUserEmail } from '@features/auth'
import { useUserPreferencesStore, selectHasCustomPreferences } from '@entities/user'
import { PreferencesForm } from '@features/profile-update'
import { Button } from '@shared/ui'

export function SettingsPage() {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)
  const userEmail = useAuthStore(selectUserEmail)
  const hasCustomPreferences = useUserPreferencesStore(selectHasCustomPreferences)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-gray-900">{userEmail}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">User ID</p>
                <p className="text-gray-600 text-sm font-mono">{user?.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Account Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
              {hasCustomPreferences && (
                <span className="text-sm text-blue-600">Custom preferences active</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Customize your experience. These preferences are saved locally and will persist across sessions.
            </p>
            <PreferencesForm />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              {/* <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">About Preferences</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Your preferences are stored locally using Zustand persist middleware. 
                    They will be applied automatically when you visit the dashboard.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
