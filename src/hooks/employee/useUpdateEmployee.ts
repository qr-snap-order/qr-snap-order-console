import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const UPDATE_EMPLOYEE = gql(`
  mutation UpdateEmployee ($id: ID!, $name: String!, $shops: [ID!]!) {
    updateEmployee(id: $id, name: $name, shops: $shops) {
      id
      name
      shops {
        id
        name
      }
    }
  }
`)

export const useUpdateEmployee = () => {
  return useMutation(UPDATE_EMPLOYEE, {
    update(cache) {
      Object.keys(cache.extract())
        .filter((key) => key.startsWith('Shop:'))
        .forEach((key) => cache.evict({ id: key, fieldName: 'employees' }))
    },
  })
}
