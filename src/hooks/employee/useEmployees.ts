import { gql, useSuspenseQuery } from '@apollo/client'

const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      name
    }
  }
`

type EmployeesData = {
  employees: {
    id: string
    name: string
  }[]
}

export const useEmployees = () => {
  return useSuspenseQuery<EmployeesData>(GET_EMPLOYEES)
}
