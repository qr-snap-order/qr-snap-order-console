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
          categories {
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
