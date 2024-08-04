import { useParams } from 'react-router-dom'

import Shop from '@/components/domain/shop/Shop'
import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
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
      <div>
        <Shop shop={data.shop} />
      </div>
    </div>
  )
}
