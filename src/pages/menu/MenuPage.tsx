import Menu from '@/components/domain/menu/Menu'
import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'

export default function MenuPage() {
  const breadcrumb = [{ label: 'Menu' }]

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <BreadcrumbNav links={breadcrumb} />
      </div>
      <div>
        <Menu />
      </div>
    </div>
  )
}
