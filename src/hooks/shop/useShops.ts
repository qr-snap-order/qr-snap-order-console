import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_SHOPS = gql(`
  query GetShops {
    shops {
      id
      name
    }
  }
`)

export const useShops = () => {
  return useSuspenseQuery(GET_SHOPS)
}
