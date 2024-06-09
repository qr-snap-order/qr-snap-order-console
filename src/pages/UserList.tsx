import { gql, useSuspenseQuery } from '@apollo/client'

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

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`

type UsersData = {
  users: {
    id: string
    name: string
  }[]
}

export default function UserList() {
  const { data } = useSuspenseQuery<UsersData>(GET_USERS)

  const {
    filter,
    setFilter,
    result: users,
  } = useFilter(data.users, ['id', 'name'])

  return (
    <div>
      <Input
        placeholder="Filter by id, name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
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
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
