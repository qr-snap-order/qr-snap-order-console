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
import { useCreateMenuItemGroup } from '@/hooks/menu/useCreateMenuItemGroup'
import { router } from '@/lib/router'

const formSchema = z.object({
  name: z.string().min(1).max(255),
  menuItems: z.array(z.string()),
})

export default function MenuItemGroupNew() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      menuItems: [],
    },
  })

  const [createMenuItemGroup, { loading }] = useCreateMenuItemGroup()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await createMenuItemGroup({
      variables: {
        name: values.name,
        menuItems: [],
      },
    })

    toast.success(`${data!.createMenuItemGroup.name} MenuItemGroup created`)

    router.navigate(`/menu-item-groups/${data!.createMenuItemGroup.id}`)
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
