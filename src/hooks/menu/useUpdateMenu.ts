import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const UPDATE_MENU = gql(`
  mutation UpdateMenu ($id: ID!, $name: String, $menuSections: [UpdateMenuSectionInput]) {
    updateMenu(id: $id, name: $name, menuSections: $menuSections) {
      id
      name
      menuSections {
        id
        name
        menuItems {
          id
          name
          price
          image
          menuItemGroups {
            id
            name
          }
        }
      }
    }
  }
`)

export const useUpdateMenu = () => {
  return useMutation(UPDATE_MENU)
}
