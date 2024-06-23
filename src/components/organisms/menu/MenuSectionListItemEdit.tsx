import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip, Trash2 } from 'lucide-react'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { formSchema } from '@/hooks/menu/useUpdateMenu'

type Props = {
  path: `menuSections.${number}`
  onRemove: () => void
  id: string
}
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

export function MenuSectionListItemEdit({ path, onRemove, id }: Props) {
  const { control } = useFormContext<z.infer<typeof formSchema>>()

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  return (
    <div
      ref={setNodeRef}
      className="flex items-center gap-2"
      style={style}
      {...attributes}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="link" {...listeners}>
              <Grip />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-primary">
            <p className="text-white">Drag and drop to change the order.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <FormField
        control={control}
        name={`${path}.name`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="link" onClick={onRemove}>
          <Trash2 />
        </Button>
      </div>
    </div>
  )
}
