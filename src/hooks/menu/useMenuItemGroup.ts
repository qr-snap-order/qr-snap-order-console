import { useSuspenseQuery } from '@apollo/client'

import { gql } from '@/__generated__'

const GET_MENU_ITEM_GROUP = gql(`
  query GetMenuItemGroup ($id: ID!) {
    menuItemGroup(id: $id) {
      id
      name
      menuItems {
        id
        name
        image
      }
    }
  }
`)

export const useMenuItemGroup = (id: string) => {
  return useSuspenseQuery(GET_MENU_ITEM_GROUP, {
    variables: { id },
  })
}
