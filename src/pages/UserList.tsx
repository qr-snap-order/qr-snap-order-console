import { gql, useSuspenseQuery } from '@apollo/client'

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
      {data.users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
