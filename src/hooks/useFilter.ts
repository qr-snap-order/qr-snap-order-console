import { useMemo, useState } from 'react'

function normalize(word: string) {
  // TODO:: 全角カタカナ、半角カタカナをひらがなに変換
  // TODO:: 全角数値を半角数値に変換
  return word.toLowerCase()
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
                  normalize(item[column]).includes(normalize(keyword)) // あいまいな検索を実現するために文字列を正規化している
              )
            )
          ),
    [data, columns, keywords]
  )

  return { filter, setFilter, result }
}
