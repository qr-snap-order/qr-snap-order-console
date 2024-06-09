import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useEmployee } from '@/hooks/employee/useEmployee'

export default function Employee() {
  const { id } = useParams()
  const { data } = useEmployee(id as string)

  if (!data.employee) return <div>Not Found</div>

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
      <div>
        <p>{data.employee.id}</p>
        <p>{data.employee.name}</p>
      </div>
    </div>
  )
}
