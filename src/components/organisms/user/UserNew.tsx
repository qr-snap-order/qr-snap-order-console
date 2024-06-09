import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreateUser } from '@/hooks/user/useCreateUser'
import { router } from '@/lib/router'

const formSchema = z.object({
  name: z.string().min(1).max(255),
})

export default function UserNew() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const [createUser, { loading }] = useCreateUser()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await createUser({
      variables: {
        name: values.name,
      },
    })

    toast.success(`${data.createUser.name} User created`)

    router.navigate(`/users/${data.createUser.id}`)
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={loading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}
