import { ImageOff } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { cn } from '@/lib/utils'

function createFileList(files: File[]) {
  // NOTE:: https://qiita.com/jkr_2255/items/1c30f7afefe6959506d2
  const dt = new DataTransfer()
  files.forEach((file) => dt.items.add(file))
  return dt.files
}

function isFileAccepted(file: File, accept: string) {
  if (!accept.trim()) return true

  const acceptedTypes = accept.split(',').map((type) => type.trim())

  return acceptedTypes.some((type) => {
    // 部分的なMIMEタイプ（カテゴリ指定）: image/*, audio/*, video/*
    const mimeCategoryPattern = /^[a-zA-Z]+\/\*$/
    // 完全なMIMEタイプ: image/png, image/jpeg, application/pdf
    const mimeTypePattern = /^[a-zA-Z]+\//
    // ファイル拡張子: .jpg, .png, .pdf, .doc
    const extensionPattern = /^\./

    if (mimeCategoryPattern.test(type)) {
      const category = type.split('/')[0]
      return file.type.startsWith(category)
    } else if (mimeTypePattern.test(type)) {
      return file.type === type
    } else if (extensionPattern.test(type)) {
      return file.name.toLowerCase().endsWith(type.toLowerCase())
    } else {
      return false // 予期しない形式の場合は合致しないとみなす
    }
  })
}

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
  const [isDragOver, setIsDragOver] = useState(false)
  const uploadImageRef = useRef<HTMLInputElement>(null)

  function handleClickImage() {
    uploadImageRef.current?.click()
  }

  function handleDragOverImage(event: React.DragEvent<HTMLImageElement>) {
    /**
     * NOTE:: onDropを発火させるために必要
     *
     * https://zenn.dev/nbr41to/articles/d5f16c9d75b9d0#ondrop
     */
    event.preventDefault()
  }

  function handleDragEnterImage() {
    setIsDragOver(true)
  }

  function handleDragLeaveImage() {
    setIsDragOver(false)
  }
  function handleChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event)
  }

  function handleDropImage(event: React.DragEvent<HTMLImageElement>) {
    event.preventDefault()

    const input = uploadImageRef.current
    const files = event.dataTransfer.files

    if (input && files.length > 0) {
      const acceptingFiles = Array.from(files).filter((file) =>
        isFileAccepted(file, input.accept)
      )
      const rejectingFiles = Array.from(files).filter(
        (file) => !isFileAccepted(file, input.accept)
      )

      input.files = createFileList(acceptingFiles)
      input.dispatchEvent(new Event('change', { bubbles: true }))

      if (rejectingFiles.length > 0) {
        toast.warning(
          rejectingFiles.map((file) => file.name).join(', ') +
            ' is not accepted.'
        )
      }
    }

    setIsDragOver(false)
  }

  function handleRemoveImage() {
    onRemove && onRemove()
  }

  return (
    <AspectRatio className="relative bg-muted" ratio={ratio}>
      <img
        className={cn(
          'size-full object-cover',
          readOnly ? 'pointer-events-none' : 'cursor-pointer',
          isDragOver && 'opacity-50'
        )}
        alt={alt}
        src={src || import.meta.env.VITE_PUBLIC_NOIMAGE}
        onClick={handleClickImage}
        onDragEnter={handleDragEnterImage}
        onDragLeave={handleDragLeaveImage}
        onDragOver={handleDragOverImage}
        onDrop={handleDropImage}
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
