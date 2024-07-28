import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_MENU_ITEM_GROUPS = gql(`
  query GetMenuItemGroups {
    menuItemGroups {
      id
      name
    }
  }
`)

export const useMenuItemGroups = () => {
  return useSuspenseQuery(GET_MENU_ITEM_GROUPS)
}
