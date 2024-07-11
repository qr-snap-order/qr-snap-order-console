import { createBrowserRouter } from 'react-router-dom'

import App from '@/App.tsx'
import Login from '@/pages/Login'
import Employee from '@/pages/employee/Employee'
import EmployeeList from '@/pages/employee/EmployeeList'
import Menu from '@/pages/menu/Menu'
import MenuItemGroupList from '@/pages/menu/MenuItemGroupList'
import Shop from '@/pages/shop/Shop'
import ShopList from '@/pages/shop/ShopList'
import User from '@/pages/user/User'
import UserList from '@/pages/user/UserList'

import MenuItemGroup from '../pages/menu/MenuItemGroup'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'users',
        element: <UserList />,
      },
      {
        path: 'users/:id',
        element: <User />,
      },
      {
        path: 'shops',
        element: <ShopList />,
      },
      {
        path: 'shops/:id',
        element: <Shop />,
      },
      {
        path: 'employees',
        element: <EmployeeList />,
      },
      {
        path: 'employees/:id',
        element: <Employee />,
      },
      {
        path: 'menu',
        element: <Menu />,
      },
      {
        path: 'menu-item-groups',
        element: <MenuItemGroupList />,
      },
      {
        path: 'menu-item-groups/:id',
        element: <MenuItemGroup />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />, // TODO:: create a login page
  },
])
