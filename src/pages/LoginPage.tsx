import { gql, useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const tenantName = 'your tenant' // TODO

export default function LoginPage() {
  return (
    <div className="flex h-dvh flex-grow items-center justify-center">
      <Card className="mx-auto mb-8 w-96">
        <CardHeader>
          <CardTitle className="text-2xl">Login Account</CardTitle>
          <CardDescription>
            Please log in to access {tenantName} console
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm />
          <NavLink
            className={cn(buttonVariants({ variant: 'ghost' }), 'w-full')}
            to="/auth/register"
          >
            or Create new Account!
          </NavLink>
        </CardContent>
      </Card>
    </div>
  )
}

const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
    }
  }
`

type LoginData = {
  login: {
    access_token: string
  }
}

const loginFormSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(6).max(255),
})

function LoginForm() {
  const navigate = useNavigate()
  const [login, { loading, error }] = useMutation<LoginData>(LOGIN)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: {
      email: 'test@example.com', // TODO:: for development
      password: 'password', // TODO:: for development
    },
    resolver: zodResolver(loginFormSchema),
  })

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const { data } = await login({
      variables: { username: values.email, password: values.password },
    })
    if (!data) throw new Error('unexpected')

    localStorage.setItem('token', data.login.access_token)

    navigate('/')
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="Email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  placeholder="Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={loading} type="submit">
          Login
        </Button>
        <FormMessage>{error?.message}</FormMessage>
      </form>
    </Form>
  )
}
