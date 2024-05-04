import { NavLink } from 'react-router-dom'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { Input } from '../components/ui/input'

const tenantName = 'your tenant' // TODO

export default function Login() {
  return (
    <div className="flex h-dvh flex-grow items-center justify-center">
      <Card className="mx-auto mb-8 w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Login Account</CardTitle>
          <CardDescription>
            Please log in to access {tenantName} console
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Login</Button>
          <NavLink
            to="/auth/register"
            className={cn(buttonVariants({ variant: 'ghost' }), 'w-full')}
          >
            or Create new Account!
          </NavLink>
        </CardContent>
      </Card>
    </div>
  )
}
