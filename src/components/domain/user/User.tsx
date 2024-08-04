import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
import { useUpdateUser } from '@/hooks/user/useUpdateUser'

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
})

type Props = {
  user: z.infer<typeof formSchema>
}

export default function User({ user }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  })

  const [isEditing, setIsEditing] = useState(false)

  const [updateUser, { loading }] = useUpdateUser()

  function handleClickEdit() {
    setIsEditing(true)
  }

  function handleClickCancel() {
    form.reset()
    setIsEditing(false)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await updateUser({
      variables: values,
    })

    setIsEditing(false)

    form.reset(data!.updateUser)

    toast.success('User updated')
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button
                disabled={loading}
                type="button"
                onClick={handleClickCancel}
              >
                Cancel
              </Button>
              <Button
                disabled={!form.formState.isDirty || loading}
                type="submit"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button type="button" onClick={handleClickEdit}>
                Edit
              </Button>
            </>
          )}
        </div>
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" readOnly={!isEditing} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
