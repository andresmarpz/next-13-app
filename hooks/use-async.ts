import { useCallback, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export default function useAsync<Data = any>({ refresh = false } = {}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState<Data | undefined>(undefined)
  const [error, setError] = useState(undefined)
  const [isFetching, setIsFetching] = useState(false)

  const isLoading = isFetching || isPending

  const execute = useCallback(
    async (cb: Promise<Data>) => {
      setError(undefined)
      setData(undefined)
      setIsFetching(true)

      return cb
        .then((res) => {
          setData(res)
          if (refresh) startTransition(() => router.refresh())
          return res
        })
        .catch((err) => {
          setError(err)
          return err
        })
        .finally(() => {
          setIsFetching(false)
        })
    },
    [refresh, router]
  )

  return {
    data,
    isLoading,
    hasError: error,
    execute
  }
}
