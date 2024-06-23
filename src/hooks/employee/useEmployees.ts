import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_EMPLOYEES = gql(`
  query GetEmployees {
    employees {
      id
      name
    }
  }
`)

export const useEmployees = () => {
  return useSuspenseQuery(GET_EMPLOYEES)
}
