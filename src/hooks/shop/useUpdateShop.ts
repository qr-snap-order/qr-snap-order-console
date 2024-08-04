import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const UPDATE_SHOP = gql(`
  mutation UpdateShop ($id: ID!, $name: String!, $employees: [ID!]!) {
    updateShop(id: $id, name: $name, employees: $employees) {
      id
      name
      employees {
        id
        name
      }
    }
  }
`)

export const useUpdateShop = () => {
  return useMutation(UPDATE_SHOP, {
    update(cache) {
      Object.keys(cache.extract())
        .filter((key) => key.startsWith('Employee:'))
        .forEach((key) => cache.evict({ id: key, fieldName: 'shops' }))
    },
  })
}
