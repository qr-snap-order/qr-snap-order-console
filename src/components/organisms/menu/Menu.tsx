import { zodResolver } from '@hookform/resolvers/zod'
import { FilePenLine } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { MenuSection } from '@/components/organisms/menu/MenuSection'
import MenuSectionListEdit from '@/components/organisms/menu/MenuSectionListEdit'
import {
  type FormInput,
  type FormOutput,
  formSchema,
} from '@/components/organisms/menu/formSchema'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMenus } from '@/hooks/menu/useMenus'
import { useUpdateMenu } from '@/hooks/menu/useUpdateMenu'

export default function Menu() {
  const { data } = useMenus()

  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: data.menus[0] ?? undefined,
  })

  const menuSections = form.watch('menuSections')

  const [updateMenu, { loading }] = useUpdateMenu()

  // TODO:: キャンセルボタンで編集から抜けるとタブが選択されていない状態になる。よい解決方法が分からないので再レンダリングさせることで対応。
  const [refreshTab, setRefreshTab] = useState(0)

  function handleClickEdit() {
    setIsEditing(true)
  }

  function handleClickCancel() {
    form.reset()
    setIsEditing(false)
    setRefreshTab((i) => i + 1)
  }

  async function onSubmit(values: FormOutput) {
    const { data } = await updateMenu({
      variables: values,
    })

    setIsEditing(false)

    form.reset(data!.updateMenu)

    toast.success(`Menu updated`)
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
              <Link to="/menu-item-groups">
                <Button type="button" variant="outline">
                  Grouping
                </Button>
              </Link>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link">
                      <FilePenLine />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <MenuSectionListEdit />
                  </DialogContent>
                </Dialog>
              )}
            </TabsList>
            {menuSections.map((menuSection, idx) => (
              <TabsContent key={menuSection.id} value={menuSection.id}>
                <MenuSection
                  isEditing={isEditing}
                  path={`menuSections.${idx}`}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </form>
    </Form>
  )
}
