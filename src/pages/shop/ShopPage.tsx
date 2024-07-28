import { useParams } from 'react-router-dom'

import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
import { Button } from '@/components/ui/button'
import { useShop } from '@/hooks/shop/useShop'

export default function ShopPage() {
  const { id } = useParams()
  const { data } = useShop(id as string)

  if (!data.shop) return <div>Not Found</div>

  const breadcrumb = [
    { label: 'Shops', href: '/shops' },
    { label: data.shop.name },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <BreadcrumbNav links={breadcrumb} />
      </div>
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
