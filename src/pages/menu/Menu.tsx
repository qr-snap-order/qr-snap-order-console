import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { zodResolver } from '@hookform/resolvers/zod'
import { FilePenLine, Grip, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form'
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
  isEditing: boolean
}
function MenuSection({ path, isEditing }: MenuSectionProp) {
  const { control } = useFormContext<z.infer<typeof formSchema>>()

  const {
    fields: menuItems,
    append,
    move,
    remove,
  } = useFieldArray({
    control,
    name: `${path}.menuItems`,
  })

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active.id !== over?.id) {
      move(
        menuItems.findIndex((menuItem) => menuItem.id === active.id),
        menuItems.findIndex((menuItem) => menuItem.id === over!.id)
      )
    }
  }

  function handleClickNewItem() {
    append({
      id: crypto.randomUUID(),
      name: '',
      price: 0,
    })
  }

  function handleClickRemoveItem(idx: number) {
    remove(idx)
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        disabled={!isEditing}
        items={menuItems}
        strategy={rectSortingStrategy}
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {menuItems.map((menuItem, idx) => (
            <MenuItem
              key={menuItem.id}
              id={menuItem.id}
              isEditing={isEditing}
              path={`${path}.menuItems.${idx}`}
              onRemove={() => handleClickRemoveItem(idx)}
            />
          ))}
          {isEditing && (
            <div className="flex h-auto min-h-[400px] items-center justify-center">
              <Button type="button" variant="link" onClick={handleClickNewItem}>
                <Plus size={50} />
              </Button>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}

type MenuItemProp = {
  path: `menuSections.${number}.menuItems.${number}`
  onRemove: () => void
  isEditing: boolean
  id: string
}
function MenuItem({ path, onRemove, isEditing, id }: MenuItemProp) {
  const { control } = useFormContext<z.infer<typeof formSchema>>()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  return (
    <div
      ref={setNodeRef}
      className={
        'relative flex flex-col gap-y-2 bg-white ' +
        (isDragging ? 'opacity-25' : '')
      }
      style={style}
      {...attributes}
    >
      {isEditing && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Grip className="absolute left-1 top-1 z-10" {...listeners} />
            </TooltipTrigger>
            <TooltipContent className="bg-primary">
              <p className="text-white">
                Drag and drop to change the order and sections.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <AspectRatio className="bg-muted" ratio={4 / 3}>
        <img
          className="size-full object-cover"
          alt="menu item image"
          src="http://localhost:5173/noimage.png"
        />
      </AspectRatio>
      <FormField
        control={control}
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
        control={control}
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
          <Button type="button" variant="link" onClick={onRemove}>
            <Trash2 />
          </Button>
        )}
      </div>
    </div>
  )
}
