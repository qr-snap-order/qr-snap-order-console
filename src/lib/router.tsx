import { createBrowserRouter } from 'react-router-dom'

import App from '@/App.tsx'
import EmployeeList from '@/pages/EmployeeList'
import Login from '@/pages/Login'
import ShopList from '@/pages/ShopList'
import UserList from '@/pages/UserList'

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
        path: 'shops',
        element: <ShopList />,
      },
      {
        path: 'employees',
        element: <EmployeeList />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />, // TODO:: create a login page
  },
])
