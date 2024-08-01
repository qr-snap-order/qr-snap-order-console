import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip, Trash2 } from 'lucide-react'

import {
  type FormInput,
  type FormOutput,
} from '@/components/domain/menu/formSchema'
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

import { InputImage } from '@/components/organisms/input-image'
import { MultipleSelect } from '@/components/organisms/multiple-select'
import { useMenuItemGroups } from '@/hooks/menu/useMenuItemGroups'
import { cn } from '@/lib/utils'

export function MenuItem({ path, onRemove, isEditing, id }: Props) {
  const form = useFormContext<FormInput, undefined, FormOutput>()
  const { control } = form

  const {
    data: { menuItemGroups },
  } = useMenuItemGroups()

  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'relative flex flex-col gap-y-2 bg-white ',
        isDragging && 'opacity-25'
      )}
      style={style}
    >
      {isEditing && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Grip
                className="absolute left-1 top-1 z-10 cursor-pointer"
                {...listeners}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-primary">
              <p className="text-white">
                Drag and drop to change the order and sections.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <FormField
        control={control}
        name={`${path}.image`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <InputImage
                alt="menu item"
                ratio={4 / 3}
                readOnly={!isEditing}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
      <FormField
        control={control}
        name={`${path}.menuItemGroups`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>groups</FormLabel>
            <FormControl>
              <MultipleSelect
                options={menuItemGroups}
                readOnly={!isEditing}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end gap-2">
        {isEditing && <Trash2 onClick={onRemove} />}
      </div>
    </div>
  )
}
