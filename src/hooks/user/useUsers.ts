import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_USERS = gql(`
  query GetUsers {
    users {
      id
      name
    }
  }
`)

export const useUsers = () => {
  return useSuspenseQuery(GET_USERS)
}
