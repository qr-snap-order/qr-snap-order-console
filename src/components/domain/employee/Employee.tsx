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
import { useUpdateEmployee } from '@/hooks/employee/useUpdateEmployee'
import { useShops } from '@/hooks/shop/useShops'
import { router } from '@/lib/router'

import { useDeleteEmployee } from '../../../hooks/employee/useDeleteEmployee'

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  shops: z.array(
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
  employee: FormInput
}

export default function Employee({ employee }: Props) {
  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: employee,
  })

  const [isEditing, setIsEditing] = useState(false)

  const [updateEmployee, { loading: updateLoading }] = useUpdateEmployee()

  const [deleteEmployee, { loading: deleteLoading }] = useDeleteEmployee()

  const loading = updateLoading || deleteLoading

  const {
    data: { shops },
  } = useShops()

  function handleClickEdit() {
    setIsEditing(true)
  }

  function handleClickCancel() {
    form.reset()
    setIsEditing(false)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data } = await updateEmployee({
      variables: values,
    })

    setIsEditing(false)

    form.reset(data!.updateEmployee)

    toast.success('Employee updated')
  }

  async function handleClickDelete() {
    await deleteEmployee({ variables: { id: employee.id } })

    router.navigate('/employees')

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
            name="shops"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shops</FormLabel>
                <FormControl>
                  <MultipleSelect
                    options={shops}
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
