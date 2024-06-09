import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/user/useUser'

export default function User() {
  const { id } = useParams()
  const { data } = useUser(id as string)

  if (!data.user) return <div>Not Found</div>

  return (
    <div>
      <div className="flex justify-end gap-2">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
      <div>
        <p>{data.user.id}</p>
        <p>{data.user.name}</p>
      </div>
    </div>
  )
}
