import { Home, Mountain, SquareM, Store, User, Users } from 'lucide-react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { SideNav } from './components/organisms/sidenav'

const logo = {
  label: 'Tenant Inc',
  icon: Mountain,
}

const navItems = [
  {
    label: 'Home',
    icon: Home,
    to: '/',
  },
  {
    label: 'Users',
    icon: User,
    to: '/users',
  },
  {
    label: 'Shops',
    icon: Store,
    to: '/shops',
  },
  {
    label: 'Employees',
    icon: Users,
    to: '/employees',
  },
  {
    label: 'Menu',
    icon: SquareM,
    to: '/menu',
  },
]

function App() {
  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <SideNav logo={logo} navItems={navItems} />
      </div>
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <header>Header</header>
        </div>
        <main className="p-4 sm:px-6 lg:px-8">
          {/* TODO:: Spinner Componentが実装されたら置き換える
           *
           * @see https://github.com/shadcn-ui/ui/pull/3554
           */}
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </>
  )
}

export default App
