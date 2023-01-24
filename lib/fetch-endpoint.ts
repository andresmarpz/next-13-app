export async function api<Data = any>(
  endpoint: string,
  options?: RequestInit | undefined
) {
  const response = await fetch('/api' + endpoint, options)
  if (!response.ok) throw new Error(response.statusText)
  const data = await response.json()
  return data as Data
}
