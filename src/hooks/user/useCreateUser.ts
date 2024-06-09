import { gql, useMutation } from '@apollo/client'

const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`

export const useCreateUser = () => {
  return useMutation(CREATE_USER, {
    update(cache, { data: { createUser } }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: createUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                  name
                }
              `,
            })
            return [...existingUsers, newUserRef]
          },
        },
      })
    },
  })
}
