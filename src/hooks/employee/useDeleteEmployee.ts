import { Reference, useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const DELETE_EMPLOYEE = gql(`
  mutation DeleteEmployee ($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`)

export const useDeleteEmployee = () => {
  return useMutation(DELETE_EMPLOYEE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          employees(existingEmployees = [], { readField }) {
            return existingEmployees.filter(
              (employeeRef: Reference) =>
                readField('id', employeeRef) !== data!.deleteEmployee.id
            )
          },
          employee(existingEmployee, { readField, DELETE }) {
            if (readField('id', existingEmployee) === data!.deleteEmployee.id) {
              return DELETE
            }
            return existingEmployee
          },
        },
      })

      cache.evict({ id: `Employee:${data!.deleteEmployee.id}` })

      Object.keys(cache.extract())
        .filter((key) => key.startsWith('Shop:'))
        .forEach((key) => cache.evict({ id: key, fieldName: 'employees' }))
    },
  })
}
