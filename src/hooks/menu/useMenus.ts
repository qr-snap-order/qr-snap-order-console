import { gql, useSuspenseQuery } from '@apollo/client'

const GET_MENUS = gql`
  query {
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
`

type MenuData = {
  menus: {
    id: string
    name: string
    menuSections: {
      id: string
      name: string
      menuItems: {
        id: string
        name: string
        price: number
        categories: {
          id: string
          name: string
        }[]
      }[]
    }[]
  }[]
}

export const useMenus = () => {
  return useSuspenseQuery<MenuData>(GET_MENUS)
}
