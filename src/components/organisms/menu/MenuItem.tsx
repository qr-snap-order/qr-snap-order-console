import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip, Trash2 } from 'lucide-react'

import {
  type FormInput,
  type FormOutput,
} from '@/components/organisms/menu/formSchema'
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
import { useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { InputImage } from '@/components/organisms/input-image'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function useImage(path: `menuSections.${number}.menuItems.${number}`) {
  const form = useFormContext<FormInput, undefined, FormOutput>()

  const image = form.watch(`${path}.image`)
  const uploadImage = form.watch(`${path}.uploadImage`)

  const src = useMemo(() => {
    if (uploadImage !== undefined)
      return uploadImage ? URL.createObjectURL(uploadImage) : null

    if (image) return `${import.meta.env.VITE_PUBLIC_STORAGE_URL}/${image}`

    return null
  }, [image, uploadImage])

  function setUploadImage(uploadImage: File | null) {
    // FIXME:: 元の状態に戻したとき、isDirtyがfalseになるようにしたい。
    form.setValue(
      `${path}.uploadImage`,
      uploadImage !== image ? uploadImage : undefined,
      { shouldDirty: true }
    )
  }

  return {
    src,
    setUploadImage,
  }
}

export function MenuItem({ path, onRemove, isEditing, id }: Props) {
  const form = useFormContext<FormInput, undefined, FormOutput>()
  const { control } = form

  const {
    fields: menuItemGroups,
    // append,
    // remove,
  } = useFieldArray({
    control,
    name: `${path}.menuItemGroups`,
  })

  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  }

  const { src, setUploadImage } = useImage(path)

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      setUploadImage(file)
    }
  }

  function handleRemoveImage() {
    setUploadImage(null)
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
      <InputImage
        alt="menu item"
        ratio={4 / 3}
        readOnly={!isEditing}
        src={src}
        onChange={handleChangeImage}
        onRemove={handleRemoveImage}
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
      <div>
        {menuItemGroups.map((menuItemGroup) => (
          <Badge key={menuItemGroup.id}>{menuItemGroup.name}</Badge>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        {isEditing && <Trash2 onClick={onRemove} />}
      </div>
    </div>
  )
}
