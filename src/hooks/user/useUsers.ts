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

export const useUsers = () => {
  return useSuspenseQuery<UsersData>(GET_USERS)
}
