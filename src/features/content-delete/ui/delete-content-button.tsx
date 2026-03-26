import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/ui'
import { useDeleteContent } from '@entities/content'
import { useAuthStore, selectUser } from '@features/auth'

interface DeleteContentButtonProps {
  contentId: string
  contentTitle: string
}

export function DeleteContentButton({ contentId, contentTitle }: DeleteContentButtonProps) {
  const navigate = useNavigate()
  const user = useAuthStore(selectUser)
  const { mutate: deleteContent, isPending } = useDeleteContent(user?.id ?? '')
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = () => {
    deleteContent(contentId, {
      onSuccess: () => {
        navigate('/dashboard')
      },
    })
  }

  if (!showConfirm) {
    return (
      <Button variant="danger" onClick={() => setShowConfirm(true)}>
        Delete
      </Button>
    )
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-700">
        Delete "{contentTitle}"? This action cannot be undone.
      </p>
      <div className="flex space-y-2">
        <Button variant="danger" onClick={handleDelete} isLoading={isPending} className="w-full">
          Confirm Delete
        </Button>
        <Button variant="secondary" onClick={() => setShowConfirm(false)} className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  )
}
