import { gql, useSuspenseQuery } from '@apollo/client'

const GET_SHOPS = gql`
  query {
    shops {
      id
      name
    }
  }
`

type ShopsData = {
  shops: {
    id: string
    name: string
  }[]
}

export const useShops = () => {
  return useSuspenseQuery<ShopsData>(GET_SHOPS)
}
