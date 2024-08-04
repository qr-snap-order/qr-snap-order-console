import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { MultipleSelect } from '@/components/organisms/multiple-select'
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
import { useEmployees } from '@/hooks/employee/useEmployees'
import { useDeleteShop } from '@/hooks/shop/useDeleteShop'
import { useUpdateShop } from '@/hooks/shop/useUpdateShop'
import { router } from '@/lib/router'

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  employees: z.array(
    z
      .object({
        id: z.string(),
        name: z.string().min(1).max(255),
      })
      .transform((employee) => employee.id)
  ),
})

export type FormInput = z.input<typeof formSchema>

export type FormOutput = z.output<typeof formSchema>

type Props = {
  shop: FormInput
}

export default function Shop({ shop }: Props) {
  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: shop,
  })

  const [isEditing, setIsEditing] = useState(false)

  const [updateShop, { loading: updateLoading }] = useUpdateShop()

  const [deleteShop, { loading: deleteLoading }] = useDeleteShop()

  const loading = updateLoading || deleteLoading

  function handleClickEdit() {
    setIsEditing(true)
  }

  function handleClickCancel() {
    form.reset()
    setIsEditing(false)
  }

  const {
    data: { employees },
  } = useEmployees()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await updateShop({
      variables: values,
    })

    setIsEditing(false)

    form.reset(data!.updateShop)

    toast.success('Shop updated')
  }

  async function handleClickDelete() {
    await deleteShop({ variables: { id: shop.id } })

    router.navigate('/shops')

    toast.success('Employee deleted')
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
              <Button
                disabled={loading}
                type="button"
                onClick={handleClickEdit}
              >
                Edit
              </Button>
              <Button
                disabled={loading}
                type="button"
                onClick={handleClickDelete}
              >
                Delete
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
          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employees</FormLabel>
                <FormControl>
                  <MultipleSelect
                    options={employees}
                    readOnly={!isEditing}
                    value={field.value}
                    onChange={field.onChange}
                  />
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
