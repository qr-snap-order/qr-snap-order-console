import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const CREATE_EMPLOYEE = gql(`
  mutation CreateEmployee ($name: String!, $shops: [ID!]!, $employeeGroups: [ID!]!) {
    createEmployee(name: $name, shops: $shops, employeeGroups: $employeeGroups) {
      id
      name
    }
  }
`)

export const useCreateEmployee = () => {
  return useMutation(CREATE_EMPLOYEE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          employees(existingEmployees = []) {
            const newEmployeeRef = cache.writeFragment({
              data: data!.createEmployee,
              fragment: gql(`
                fragment NewEmployee on Employee {
                  id
                  name
                }
              `),
            })
            return [...existingEmployees, newEmployeeRef]
          },
        },
      })
    },
  })
}
