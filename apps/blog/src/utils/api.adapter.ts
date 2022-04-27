export const adaptFormToAPI = (props: Record<string, string>) => {
  const obj: Record<string, string | null> = {}

  Object.entries(props).map(([key, value]) => {
    if (value) obj[key] = value
    else obj[key] = null
  })

  return obj
}
