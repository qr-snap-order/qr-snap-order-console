import { useMutation } from '@apollo/client'

import { gql } from '@/__generated__'

const CREATE_MENU_ITEM_GROUP = gql(`
  mutation CreateMenuItemGroup ($name: String!, $menuItems: [ID!]!) {
    createMenuItemGroup(name: $name, menuItems: $menuItems) {
      id
      name
    }
  }
`)

export const useCreateMenuItemGroup = () => {
  return useMutation(CREATE_MENU_ITEM_GROUP, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          menuItemGroups(existingMenuItemGroups = []) {
            const newMenuItemGroupRef = cache.writeFragment({
              data: data!.createMenuItemGroup,
              fragment: gql(`
                fragment NewMenuItemGroup on MenuItemGroup {
                  id
                  name
                }
              `),
            })
            return [...existingMenuItemGroups, newMenuItemGroupRef]
          },
        },
      })
    },
  })
}
