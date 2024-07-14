import { Link } from 'react-router-dom'

import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
import UserNew from '@/components/organisms/user/UserNew'
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
import { useFilter } from '@/hooks/useFilter'
import { useUsers } from '@/hooks/user/useUsers'

export default function UserList() {
  const { data } = useUsers()

  const {
    filter,
    setFilter,
    result: users,
  } = useFilter(data.users, ['id', 'name'])

  const breadcrumb = [{ label: 'Users' }]

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
            <UserNew />
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Link to={`/users/${user.id}`}>
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
