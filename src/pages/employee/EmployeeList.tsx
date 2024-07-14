import { Link } from 'react-router-dom'

import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
import EmployeeNew from '@/components/organisms/employee/EmployeeNew'
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
import { useEmployees } from '@/hooks/employee/useEmployees'
import { useFilter } from '@/hooks/useFilter'

export default function EmployeeList() {
  const { data } = useEmployees()

  const {
    filter,
    setFilter,
    result: employees,
  } = useFilter(data.employees, ['id', 'name'])

  const breadcrumb = [{ label: 'Employees' }]

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
            <EmployeeNew />
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
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>
                <Link to={`/employees/${employee.id}`}>
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
