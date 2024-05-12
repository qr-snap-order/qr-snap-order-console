import { gql, useSuspenseQuery } from '@apollo/client'

const GET_USERS = gql`
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

export default function EmployeeList() {
  const { data } = useSuspenseQuery<EmployeesData>(GET_USERS)
  return (
    <div>
      {data.employees.map((employee) => (
        <div key={employee.id}>{employee.name}</div>
      ))}
    </div>
  )
}
