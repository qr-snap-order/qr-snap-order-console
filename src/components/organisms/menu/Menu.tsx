import { zodResolver } from '@hookform/resolvers/zod'
import { FilePenLine } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { MenuSection } from '@/components/organisms/menu/MenuSection'
import MenuSectionListEdit from '@/components/organisms/menu/MenuSectionListEdit'
import { formSchema } from '@/components/organisms/menu/formSchema'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMenus } from '@/hooks/menu/useMenus'

export default function Menu() {
  const { data } = useMenus()

  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data.menus[0] ?? undefined,
  })

  const menuSections = form.watch('menuSections')

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button type="button" onClick={handleClickCancel}>
                Cancel
              </Button>
              <Button disabled={!form.formState.isDirty} type="submit">
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
