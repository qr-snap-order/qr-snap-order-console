import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import Login from './pages/Login'

const client = new ApolloClient({
  uri: import.meta.env.VITE_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const router = createBrowserRouter([
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)
