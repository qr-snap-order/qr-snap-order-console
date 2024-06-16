import { zodResolver } from '@hookform/resolvers/zod'
import { FilePenLine, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { type UseFormReturn, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { BreadcrumbNav } from '@/components/breadcrubnav'
import { AspectRatio } from '@/components/ui/aspect-ratio'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMenus } from '@/hooks/menu/useMenus'

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  menuSections: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1).max(255),
      menuItems: z.array(
        z.object({
          id: z.string(),
          name: z.string().min(1).max(255),
          price: z.coerce.number().min(0).max(99999999),
        })
      ),
    })
  ),
})

export default function Menu() {
  const { data } = useMenus()

  const breadcrumb = [{ label: 'Menu' }]

  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data.menus[0] ?? undefined,
  })

  const {
    fields: menuSections,
    // append,
    // update,
    // remove,
  } = useFieldArray({
    control: form.control,
    name: 'menuSections',
  })

  // TODO:: キャンセルボタンで編集から抜けるとタブが選択されていない状態になる。よい解決方法が分からないので再レンダリングさせることで対応。
  const [refreshTab, setRefreshTab] = useState(0)

  function onEdit() {
    setIsEditing(true)
  }

  function onCancel() {
    form.reset()
    setIsEditing(false)
    setRefreshTab((i) => i + 1)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-4">
        <BreadcrumbNav links={breadcrumb} />
      </div>

      <div>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <Button type="button" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button disabled={!form.formState.isDirty} type="submit">
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button type="button" onClick={onEdit}>
                    Edit
                  </Button>
                </>
              )}
            </div>
            <div>
              <Tabs key={refreshTab} defaultValue={menuSections[0]?.id}>
                <TabsList>
                  {menuSections.map((menuSection) => (
                    <TabsTrigger key={menuSection.id} value={menuSection.id}>
                      {menuSection.name}
                    </TabsTrigger>
                  ))}
                  {isEditing && (
                    <Button
                      variant="link"
                      onClick={() => alert('Edit Section')}
                    >
                      <FilePenLine />
                    </Button>
                  )}
                </TabsList>
                {menuSections.map((menuSection, idx) => (
                  <TabsContent key={menuSection.id} value={menuSection.id}>
                    <MenuSection
                      form={form}
                      isEditing={isEditing}
                      path={`menuSections.${idx}`}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

type MenuSectionProp = {
  path: `menuSections.${number}`
  form: UseFormReturn<z.infer<typeof formSchema>>
  isEditing: boolean
}
function MenuSection({ form, path, isEditing }: MenuSectionProp) {
  const {
    fields: menuItems,
    append,
    // update,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `${path}.menuItems`,
  })

  function appendNewItem() {
    append({
      id: crypto.randomUUID(),
      name: '',
      price: 0,
    })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {menuItems.map((menuItem, idx) => (
        <MenuItem
          key={menuItem.id}
          form={form}
          isEditing={isEditing}
          path={`${path}.menuItems.${idx}`}
          onRemove={() => remove(idx)}
        />
      ))}
      {isEditing && (
        <Button className="h-[440px]" variant="link" onClick={appendNewItem}>
          <Plus size={50} />
        </Button>
      )}
    </div>
  )
}

type MenuItemProp = {
  path: `menuSections.${number}.menuItems.${number}`
  form: UseFormReturn<z.infer<typeof formSchema>>
  onRemove: () => void
  isEditing: boolean
}
function MenuItem({ form, path, onRemove, isEditing }: MenuItemProp) {
  return (
    <div className="flex flex-col gap-y-2">
      <AspectRatio className="bg-muted" ratio={4 / 3}>
        <img
          className="size-full object-cover"
          alt="menu item image"
          src="http://localhost:5173/noimage.png"
        />
      </AspectRatio>

      <FormField
        control={form.control}
        name={`${path}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>name</FormLabel>
            <FormControl>
              <Input placeholder="name" readOnly={!isEditing} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${path}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>price</FormLabel>
            <FormControl>
              <Input
                max={99999999}
                min={0}
                placeholder="price"
                readOnly={!isEditing}
                type="number"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end gap-2">
        {isEditing && (
          <Button variant="link">
            <Trash2 onClick={onRemove} />
          </Button>
        )}
      </div>
    </div>
  )
}
