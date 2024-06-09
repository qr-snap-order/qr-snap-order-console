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

  const {
    filter,
    setFilter,
    result: employees,
  } = useFilter(data.employees, ['id', 'name'])

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
          {employees.map((employee) => (
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
