import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_USER = gql(`
  query GetUser ($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`)

export const useUser = (id: string) => {
  return useSuspenseQuery(GET_USER, {
    variables: { id },
  })
}
