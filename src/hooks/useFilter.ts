import { useMemo, useState } from 'react'

function isMatchKeyword(word: string, keyword: string) {
  // TODO:: カタカナとひらがなを区別しないで検索できるようにする
  return word.toLowerCase().includes(keyword.toLowerCase())
}

export function useFilter<T>(data: T[], columns: (keyof T)[]) {
  const [filter, setFilter] = useState('')

  const keywords = useMemo(
    // eslint-disable-next-line no-irregular-whitespace
    () => filter.split(/[\s　]+/).filter((keyword) => keyword !== ''),
    [filter]
  )

  const result = useMemo(
    () =>
      keywords.length === 0
        ? data
        : data.filter((item) =>
            keywords.every((keyword) =>
              columns.some(
                (column) =>
                  typeof item[column] === 'string' &&
                  isMatchKeyword(item[column], keyword)
              )
            )
          ),
    [data, columns, keywords]
  )

  return { filter, setFilter, result }
}
