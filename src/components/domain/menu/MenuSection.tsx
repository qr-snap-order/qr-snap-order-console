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
import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { MenuItem } from '@/components/domain/menu/MenuItem'
import {
  type FormInput,
  type FormOutput,
} from '@/components/domain/menu/formSchema'
import { Button } from '@/components/ui/button'

type Props = {
  path: `menuSections.${number}`
  isEditing: boolean
}
export function MenuSection({ path, isEditing }: Props) {
  const { control } = useFormContext<FormInput, undefined, FormOutput>()

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
      image: null,
      menuItemGroups: [],
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
