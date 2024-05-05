import { createBrowserRouter } from 'react-router-dom'

import App from '@/App.tsx'
import Login from '@/pages/Login'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'users',
        element: <div>users</div>, // TODO:: create a users page
      },
      {
        path: 'shops',
        element: <div>shops</div>, // TODO:: create a shops page
      },
      {
        path: 'employees',
        element: <div>shops</div>, // TODO:: create a shops page
      },
    ],
  },
  {
    path: 'login',
    element: <Login />, // TODO:: create a login page
  },
])
