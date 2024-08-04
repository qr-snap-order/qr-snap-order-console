import { Check, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import { useFilter } from '@/hooks/useFilter'

function hasClassOrNested(element: unknown, className: string) {
  let el: unknown = element
  while (el instanceof Element) {
    if (el.classList.contains(className)) {
      return true
    }
    el = el.parentElement
  }
  return false
}

type Option = {
  id: string
  name: string
}

type Props = {
  options: Option[]
  value: Option[]
  readOnly?: boolean
  onChange?: (value: Option[]) => void
}
export function MultipleSelect({
  options,
  value,
  readOnly = false,
  onChange,
}: Props) {
  const {
    filter,
    setFilter,
    result: filteredOptions,
  } = useFilter(options, ['name'])

  function handleToggleOption(id: string) {
    if (!onChange) return

    if (value.find((selected) => selected.id === id)) {
      onChange(value.filter((option) => option.id !== id))
    } else {
      onChange([...value, options.find((option) => option.id === id)!])
    }
  }

  function handleRemoveOption(id: string) {
    if (!onChange) return

    onChange(value.filter((option) => option.id !== id))
  }

  function handlePointerDownOutside(
    e: CustomEvent<{
      originalEvent: PointerEvent
    }>
  ) {
    /**
     * NOTE:: BadgeのXボタンをクリックした場合は閉じない
     */
    if (hasClassOrNested(e.target, 'prevent-close-selectbox')) {
      e.preventDefault()
    }
  }

  if (readOnly) {
    return (
      <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
        <div className="flex flex-wrap gap-2">
          {value.map((selected) => (
            <Badge key={selected.id}>{selected.name}</Badge>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Select onOpenChange={() => setFilter('')}>
      <SelectTrigger className="pointer-events-auto h-fit min-h-10">
        <div className="flex flex-wrap gap-2">
          {value.map((selected) => (
            <Badge key={selected.id}>
              {selected.name}
              <X
                className="prevent-close-selectbox pointer-events-auto ml-1"
                size="16"
                onClickCapture={() => handleRemoveOption(selected.id)}
              />
            </Badge>
          ))}
        </div>
      </SelectTrigger>
      <SelectContent onPointerDownOutside={(e) => handlePointerDownOutside(e)}>
        <div>
          {options.length > 10 && (
            <Input
              className="mb-2"
              placeholder="search filter..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
          {filteredOptions.map((option) => (
            <div
              key={option.id}
              className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-slate-100 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              onClick={() => handleToggleOption(option.id)}
            >
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {!value.find((selected) => selected.id === option.id) || (
                  <Check className="h-4 w-4" />
                )}
              </span>
              {option.name}
            </div>
          ))}
        </div>
      </SelectContent>
    </Select>
  )
}
