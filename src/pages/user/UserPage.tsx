import { useParams } from 'react-router-dom'

import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/user/useUser'

export default function UserPage() {
  const { id } = useParams()
  const { data } = useUser(id as string)

  if (!data.user) return <div>Not Found</div>

  const breadcrumb = [
    { label: 'Users', href: '/users' },
    { label: data.user.name },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <BreadcrumbNav links={breadcrumb} />
      </div>
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
