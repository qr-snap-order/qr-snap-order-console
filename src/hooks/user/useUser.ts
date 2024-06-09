import { gql, useSuspenseQuery } from '@apollo/client'

const GET_USER = gql`
  query ($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`

type GetUserData = {
  user: {
    id: string
    name: string
  } | null
}

export const useUser = (id: string) => {
  return useSuspenseQuery<GetUserData>(GET_USER, {
    variables: { id },
  })
}
