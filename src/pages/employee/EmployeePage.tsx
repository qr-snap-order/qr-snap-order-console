import { useParams } from 'react-router-dom'

import Employee from '@/components/domain/employee/Employee'
import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
import { useEmployee } from '@/hooks/employee/useEmployee'

export default function EmployeePage() {
  const { id } = useParams()
  const { data } = useEmployee(id as string)

  if (!data.employee) return <div>Not Found</div>

  const breadcrumb = [
    { label: 'Employees', href: '/employees' },
    { label: data.employee.name },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <BreadcrumbNav links={breadcrumb} />
      </div>
      <div>
        <Employee employee={data.employee} />
      </div>
    </div>
  )
}
