import { useParams } from 'react-router-dom'

import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { useMenuItemGroup } from '@/hooks/menu/useMenuItemGroup'

export default function MenuItemGroupPage() {
  const { id } = useParams()

  const { data } = useMenuItemGroup(id as string)

  if (!data.menuItemGroup) return <div>Not Found</div>

  const breadcrumb = [
    { label: 'Menu', href: '/menu' },
    { label: 'Grouping', href: '/menu-item-groups' },
    { label: data.menuItemGroup.name },
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
        <p>{data.menuItemGroup.id}</p>
        <p>{data.menuItemGroup.name}</p>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.menuItemGroup.menuItems.map((menuItem) => (
            <div key={menuItem.id}>
              <div>
                <AspectRatio className="relative bg-muted" ratio={4 / 3}>
                  <img
                    className="size-full object-cover"
                    alt="menu item"
                    src={
                      menuItem.image
                        ? `http://localhost:4566/develop-public/${menuItem.image}`
                        : 'http://localhost:5173/noimage.png'
                    }
                  />
                </AspectRatio>
              </div>
              <div>{menuItem.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
