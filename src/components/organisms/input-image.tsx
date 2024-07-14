import { ImageOff } from 'lucide-react'
import { useRef } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

type InputImageProps = {
  src?: null | string
  alt: string
  accept?: string
  ratio: number
  readOnly: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemove?: () => void
}
export function InputImage({
  src,
  alt,
  accept,
  ratio,
  readOnly,
  onChange,
  onRemove,
}: InputImageProps) {
  const uploadImageRef = useRef<HTMLInputElement>(null)

  function handleClickImage() {
    uploadImageRef.current?.click()
  }

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event)
  }

  function handleRemoveImage() {
    onRemove && onRemove()
  }

  return (
    <AspectRatio className="relative bg-muted" ratio={ratio}>
      <img
        className={cn(
          'size-full object-cover',
          readOnly ? 'pointer-events-none' : 'cursor-pointer'
        )}
        alt={alt}
        src={src || import.meta.env.VITE_PUBLIC_NOIMAGE}
        onClick={handleClickImage}
      />
      {readOnly || !src || (
        <ImageOff
          className="absolute right-1 top-1 cursor-pointer"
          onClick={handleRemoveImage}
        />
      )}
      <input
        ref={uploadImageRef}
        className="hidden"
        accept={accept ?? 'image/*'}
        type="file"
        onChange={handleChangeImage}
      />
    </AspectRatio>
  )
}
