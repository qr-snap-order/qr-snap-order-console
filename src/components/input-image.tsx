import { Trash2 } from 'lucide-react'
import { useRef } from 'react'

import { AspectRatio } from '@/components/ui/aspect-ratio'

type InputImageProps = {
  src: string
  alt: string
  accept?: string
  rate: number
  readOnly: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export function InputImage({
  src,
  alt,
  accept,
  rate,
  readOnly,
  onChange,
}: InputImageProps) {
  const uploadImageRef = useRef<HTMLInputElement>(null)

  function handleClickImage() {
    if (readOnly) return
    uploadImageRef.current?.click()
  }

  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event)
  }

  return (
    <AspectRatio className="relative bg-muted" ratio={rate}>
      <img
        className="size-full object-cover"
        alt={alt}
        src={src}
        onClick={handleClickImage}
      />
      {readOnly || <Trash2 className="absolute right-1 top-1" />}
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
