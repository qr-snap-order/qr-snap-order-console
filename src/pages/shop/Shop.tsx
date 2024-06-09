import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useShop } from '@/hooks/shop/useShop'

export default function Shop() {
  const { id } = useParams()
  const { data } = useShop(id as string)

  if (!data.shop) return <div>Not Found</div>

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
      <div>
        <p>{data.shop.id}</p>
        <p>{data.shop.name}</p>
      </div>
    </div>
  )
}
