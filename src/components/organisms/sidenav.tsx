import { Home, Mountain, SquareM, Store, User, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TTnTF2FR10A
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

const TenantIcon = Mountain

const navItems = [
  {
    name: 'Home',
    icon: Home,
    to: '/',
  },
  {
    name: 'Users',
    icon: User,
    to: '/users',
  },
  {
    name: 'Shops',
    icon: Store,
    to: '/shops',
  },
  {
    name: 'Employees',
    icon: Users,
    to: '/employees',
  },
  {
    name: 'Menu',
    icon: SquareM,
    to: '/menu',
  },
]

export function SideNav() {
  return (
    <nav className="h-full w-full bg-primary">
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Link className="flex items-center gap-2 text-gray-300" to="/">
          <TenantIcon className="h-5 w-5" />
          <span className="text-lg font-semibold text-gray-50">Tenant Inc</span>
        </Link>
      </div>
      <div className="space-y-2 px-4 py-6">
        {navItems.map((item) => (
          <Link
            key={item.name}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-primary/80 hover:text-gray-50 dark:text-gray-400 dark:hover:bg-primary/80 dark:hover:text-gray-50"
            to={item.to}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
