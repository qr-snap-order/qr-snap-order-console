import { gql, useSuspenseQuery } from '@apollo/client'

const GET_EMPLOYEE = gql`
  query ($id: ID!) {
    employee(id: $id) {
      id
      name
      shops {
        id
        name
      }
    }
  }
`

type GetEmployeeData = {
  employee: {
    id: string
    name: string
    shops: {
      id: string
      name: string
    }[]
  } | null
}

export const useEmployee = (id: string) => {
  return useSuspenseQuery<GetEmployeeData>(GET_EMPLOYEE, {
    variables: { id },
  })
}
