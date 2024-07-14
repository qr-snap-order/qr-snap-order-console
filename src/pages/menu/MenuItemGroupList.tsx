import { Link } from 'react-router-dom'

import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
import MenuItemGroupNew from '@/components/organisms/menu/MenuItemGroupNew'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useMenuItemGroups } from '@/hooks/menu/useMenuItemGroups'
import { useFilter } from '@/hooks/useFilter'

export default function MenuItemGroupList() {
  const breadcrumb = [{ label: 'Menu', href: '/menu' }, { label: 'Grouping' }]

  const { data } = useMenuItemGroups()

  const {
    filter,
    setFilter,
    result: menuItemGroups,
  } = useFilter(data.menuItemGroups, ['id', 'name'])

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <BreadcrumbNav links={breadcrumb} />
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Filter by id, name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogContent>
            <MenuItemGroupNew />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItemGroups.map((menuItemGroup) => (
            <TableRow key={menuItemGroup.id}>
              <TableCell>{menuItemGroup.id}</TableCell>
              <TableCell>{menuItemGroup.name}</TableCell>
              <TableCell>
                <Link to={`/menu-item-groups/${menuItemGroup.id}`}>
                  <Button variant="link">Show</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
