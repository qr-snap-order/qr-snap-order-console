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
    employees {
      id
      name
    }
  }
`

type EmployeesData = {
  employees: {
    id: string
    name: string
  }[]
}

export default function EmployeeList() {
  const { data } = useSuspenseQuery<EmployeesData>(GET_USERS)
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
          {data.employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
