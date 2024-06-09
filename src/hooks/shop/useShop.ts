import { gql, useSuspenseQuery } from '@apollo/client'

const GET_SHOP = gql`
  query ($id: ID!) {
    shop(id: $id) {
      id
      name
      employees {
        id
        name
      }
    }
  }
`

type GetShopData = {
  shop: {
    employees: {
      id: string
      name: string
    }[]
    id: string
    name: string
  } | null
}

export const useShop = (id: string) => {
  return useSuspenseQuery<GetShopData>(GET_SHOP, {
    variables: { id },
  })
}
