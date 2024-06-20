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
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { formSchema } from '@/hooks/menu/useUpdateMenu'

import { MenuSectionListItemEdit } from './MenuSectionListItemEdit'

export default function MenuSectionListEdit() {
  const { control } = useFormContext<z.infer<typeof formSchema>>()

  const {
    fields: menuSections,
    append,
    // update,
    remove,
    move,
  } = useFieldArray({
    control: control,
    name: 'menuSections',
  })

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active.id !== over?.id) {
      move(
        menuSections.findIndex((menuSection) => menuSection.id === active.id),
        menuSections.findIndex((menuSection) => menuSection.id === over!.id)
      )
    }
  }

  function handleClickNewSection() {
    append({
      id: crypto.randomUUID(),
      name: '',
      menuItems: [],
    })
  }

  function handleClickRemoveSection(idx: number) {
    remove(idx)
  }

  return (
    <div>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={menuSections} strategy={rectSortingStrategy}>
          <div className="flex flex-col gap-2">
            {menuSections.map((menuSection, idx) => (
              <MenuSectionListItemEdit
                key={menuSection.id}
                id={menuSection.id}
                path={`menuSections.${idx}`}
                onRemove={() => handleClickRemoveSection(idx)}
              />
            ))}
            <div>
              <Button
                type="button"
                variant="link"
                onClick={handleClickNewSection}
              >
                <Plus />
              </Button>
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
