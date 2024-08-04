import { useParams } from 'react-router-dom'

import User from '@/components/domain/user/User'
import { BreadcrumbNav } from '@/components/organisms/breadcrubnav'
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
      <div>
        <User user={data.user} />
      </div>
    </div>
  )
}
