import { gql, useMutation } from '@apollo/client'
import { z } from 'zod'

const UPDATE_MENU = gql`
  mutation ($id: ID!, $name: String, $menuSections: [UpdateMenuSectionInput]) {
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
`

type UpdateMenuInput = {
  id: string
  name: string
  menuSections: {
    id: string
    name: string
    menuItems: {
      id: string
      name: string
      price: number
    }[]
  }[]
}

type UpdateMenuResult = {
  updateMenu: {
    id: string
    name: string
    menuSections: {
      id: string
      name: string
      menuItems: {
        id: string
        name: string
        price: number
      }[]
    }[]
  }
}

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
  return useMutation<UpdateMenuResult, UpdateMenuInput>(UPDATE_MENU)
}
