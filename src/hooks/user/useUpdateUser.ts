import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const UPDATE_USER = gql(`
  mutation UpdateUser ($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`)

export const useUpdateUser = () => {
  return useMutation(UPDATE_USER)
}
