import { Link } from 'react-router-dom'
import type { Content } from '@entities/content'

interface ContentCardProps {
  content: Content
}

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Link
      to={`/content/${content.id}`}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {content.title}
            {content.is_favorite && <span className="ml-2 text-blue-600">★</span>}
          </h3>
          {content.description && (
            <p className="text-gray-600 text-sm mb-4">{content.description}</p>
          )}
          <p className="text-sm text-gray-500">
            {new Date(content.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  )
}
