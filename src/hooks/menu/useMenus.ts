import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_MENUS = gql(`
  query GetMenus {
    menus {
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

export const useMenus = () => {
  return useSuspenseQuery(GET_MENUS)
}
