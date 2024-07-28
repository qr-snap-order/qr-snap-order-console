import { createBrowserRouter } from 'react-router-dom'

import AppPage from '@/App.tsx'
import LoginPage from '@/pages/LoginPage'
import EmployeeListPage from '@/pages/employee/EmployeeListPage'
import EmployeePage from '@/pages/employee/EmployeePage'
import MenuItemGroupListPage from '@/pages/menu/MenuItemGroupListPage'
import MenuItemGroupPage from '@/pages/menu/MenuItemGroupPage'
import MenuPage from '@/pages/menu/MenuPage'
import ShopListPage from '@/pages/shop/ShopListPage'
import ShopPage from '@/pages/shop/ShopPage'
import UserListPage from '@/pages/user/UserListPage'
import UserPage from '@/pages/user/UserPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppPage />,
    children: [
      {
        path: 'users',
        element: <UserListPage />,
      },
      {
        path: 'users/:id',
        element: <UserPage />,
      },
      {
        path: 'shops',
        element: <ShopListPage />,
      },
      {
        path: 'shops/:id',
        element: <ShopPage />,
      },
      {
        path: 'employees',
        element: <EmployeeListPage />,
      },
      {
        path: 'employees/:id',
        element: <EmployeePage />,
      },
      {
        path: 'menu',
        element: <MenuPage />,
      },
      {
        path: 'menu-item-groups',
        element: <MenuItemGroupListPage />,
      },
      {
        path: 'menu-item-groups/:id',
        element: <MenuItemGroupPage />,
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />, // TODO:: create a login page
  },
])
