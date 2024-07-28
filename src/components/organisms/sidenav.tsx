import { Link } from 'react-router-dom'

type Props = {
  logo: {
    label: string
    icon: React.ElementType
  }
  navItems: {
    label: string
    icon: React.ElementType
    to: string
  }[]
}

export function SideNav({ logo, navItems }: Props) {
  return (
    <nav className="h-full w-full bg-primary">
      <div className="flex h-16 shrink-0 items-center justify-between px-4">
        <Link className="flex items-center gap-2 text-gray-300" to="/">
          <logo.icon className="h-5 w-5" />
          <span className="text-lg font-semibold text-gray-50">
            {logo.label}
          </span>
        </Link>
      </div>
      <div className="space-y-2 px-4 py-6">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-primary/80 hover:text-gray-50 dark:text-gray-400 dark:hover:bg-primary/80 dark:hover:text-gray-50"
            to={item.to}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
