import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const CREATE_USER = gql(`
  mutation CreateUser ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`)

export const useCreateUser = () => {
  return useMutation(CREATE_USER, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: data!.createUser,
              fragment: gql(`
                fragment NewUser on User {
                  id
                  name
                }
              `),
            })
            return [...existingUsers, newUserRef]
          },
        },
      })
    },
  })
}
