import { gql, useMutation } from '@apollo/client'

const CREATE_SHOP = gql`
  mutation ($name: String!) {
    createShop(name: $name) {
      id
      name
    }
  }
`

export const useCreateShop = () => {
  return useMutation(CREATE_SHOP, {
    update(cache, { data: { createShop } }) {
      cache.modify({
        fields: {
          shops(existingShops = []) {
            const newShopRef = cache.writeFragment({
              data: createShop,
              fragment: gql`
                fragment NewShop on Shop {
                  id
                  name
                }
              `,
            })
            return [...existingShops, newShopRef]
          },
        },
      })
    },
  })
}
