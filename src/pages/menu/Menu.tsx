import { BreadcrumbNav } from '@/components/breadcrubnav'
import MenuComponent from '@/components/organisms/menu/Menu'

export default function Menu() {
  const breadcrumb = [{ label: 'Menu' }]

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <BreadcrumbNav links={breadcrumb} />
      </div>
      <div>
        <MenuComponent />
      </div>
    </div>
  )
}
