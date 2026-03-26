import { Button } from '@shared/ui'
import { useToggleFavorite } from '@entities/content'
import { useAuthStore, selectUser } from '@features/auth'

interface FavoriteToggleButtonProps {
  contentId: string
  isFavorite: boolean
}

export function FavoriteToggleButton({ contentId, isFavorite }: FavoriteToggleButtonProps) {
  const user = useAuthStore(selectUser)
  const { mutate: toggleFavorite, isPending } = useToggleFavorite(user?.id ?? '')

  const handleToggle = () => {
    toggleFavorite({ id: contentId, isFavorite: !isFavorite })
  }

  return (
    <Button
      variant="secondary"
      onClick={handleToggle}
      isLoading={isPending}
      className="w-full"
    >
      {isFavorite ? '★ Unfavorite' : '☆ Favorite'}
    </Button>
  )
}
