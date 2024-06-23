import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_SHOP = gql(`
  query GetShop ($id: ID!) {
    shop(id: $id) {
      id
      name
      employees {
        id
        name
      }
    }
  }
`)

export const useShop = (id: string) => {
  return useSuspenseQuery(GET_SHOP, {
    variables: { id },
  })
}
