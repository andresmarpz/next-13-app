import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

export default function useAsync<Data = void>(
  callback?: () => Promise<Data>,
  { refresh = false, immediate = false } = {}
) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<Data | undefined>(undefined)
  const [error, setError] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)

  const isLoading = isFetching || isPending

  const execute = useCallback(
    async (cb?: () => Promise<Data>) => {
      setError(undefined)
      setData(undefined)
      setIsFetching(true)
      const response = await (callback ? callback : cb)!()
        .then((res) => setData(res))
        .catch((err) => setError(err))

      setIsFetching(false)

      if (refresh) startTransition(() => router.refresh())

      return response
    },
    [callback, refresh, router]
  )

  useEffect(() => {
    if (immediate) execute()
  }, [execute, immediate])

  return {
    data,
    isLoading,
    hasError: error,
    execute
  }
}
