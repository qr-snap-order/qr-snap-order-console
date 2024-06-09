import { gql, useSuspenseQuery } from '@apollo/client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.users.map((user) => (
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
