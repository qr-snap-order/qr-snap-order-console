import { Reference, useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const DELETE_SHOP = gql(`
  mutation DeleteShop ($id: ID!) {
    deleteShop(id: $id) {
      id
    }
  }
`)

export const useDeleteShop = () => {
  return useMutation(DELETE_SHOP, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          shops(existingShops = [], { readField }) {
            return existingShops.filter(
              (shopRef: Reference) =>
                readField('id', shopRef) !== data!.deleteShop.id
            )
          },
          shop(existingShop, { readField, DELETE }) {
            if (readField('id', existingShop) === data!.deleteShop.id) {
              return DELETE
            }
            return existingShop
          },
        },
      })

      cache.evict({ id: `Shop:${data!.deleteShop.id}` })

      Object.keys(cache.extract())
        .filter((key) => key.startsWith('Employee:'))
        .forEach((key) => cache.evict({ id: key, fieldName: 'shops' }))
    },
  })
}
