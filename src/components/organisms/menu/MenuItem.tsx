import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip, Trash2 } from 'lucide-react'

import { formSchema } from '@/components/organisms/menu/formSchema'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type Props = {
  path: `menuSections.${number}.menuItems.${number}`
  onRemove: () => void
  isEditing: boolean
  id: string
}
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

export function MenuItem({ path, onRemove, isEditing, id }: Props) {
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
