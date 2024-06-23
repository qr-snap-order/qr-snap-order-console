import { useMutation } from '@apollo/client'
import { z } from 'zod'

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
        }
      }
    }
  }
`)

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  menuSections: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1).max(255),
      menuItems: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(1).max(255),
          price: z.coerce.number().min(0).max(99999999),
        })
      ),
    })
  ),
})

export const useUpdateMenu = () => {
  return useMutation(UPDATE_MENU)
}
