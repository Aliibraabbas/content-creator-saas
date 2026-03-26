import { ContentCard } from './content-card'
import type { Content } from '@entities/content'

interface ContentListProps {
  contents: Content[]
  isLoading?: boolean
}

export function ContentList({ contents, isLoading }: ContentListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading contents...</p>
      </div>
    )
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No content found. Create your first one!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </div>
  )
}
