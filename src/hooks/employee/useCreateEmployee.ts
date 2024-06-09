import { gql, useMutation } from '@apollo/client'

const CREATE_EMPLOYEE = gql`
  mutation ($name: String!) {
    createEmployee(name: $name) {
      id
      name
    }
  }
`

export const useCreateEmployee = () => {
  return useMutation(CREATE_EMPLOYEE, {
    update(cache, { data: { createEmployee } }) {
      cache.modify({
        fields: {
          employees(existingEmployees = []) {
            const newEmployeeRef = cache.writeFragment({
              data: createEmployee,
              fragment: gql`
                fragment NewEmployee on Employee {
                  id
                  name
                }
              `,
            })
            return [...existingEmployees, newEmployeeRef]
          },
        },
      })
    },
  })
}
