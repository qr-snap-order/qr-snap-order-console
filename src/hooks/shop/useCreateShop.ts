import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const CREATE_SHOP = gql(`
  mutation CreateShop ($name: String!) {
    createShop(name: $name) {
      id
      name
    }
  }
`)

export const useCreateShop = () => {
  return useMutation(CREATE_SHOP, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          shops(existingShops = []) {
            const newShopRef = cache.writeFragment({
              data: data!.createShop,
              fragment: gql(`
                fragment NewShop on Shop {
                  id
                  name
                }
              `),
            })
            return [...existingShops, newShopRef]
          },
        },
      })
    },
  })
}
