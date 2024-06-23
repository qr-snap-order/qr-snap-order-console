import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_EMPLOYEE = gql(`
  query GetEmployee ($id: ID!) {
    employee(id: $id) {
      id
      name
      shops {
        id
        name
      }
    }
  }
`)

export const useEmployee = (id: string) => {
  return useSuspenseQuery(GET_EMPLOYEE, {
    variables: { id },
  })
}
