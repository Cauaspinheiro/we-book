export const adaptFormToAPI = (props: Record<string, string>) => {
  const obj: Record<string, string> = {}

  Object.entries(props).map(([key, value]) => {
    if (value) obj[key] = value
  })

  return obj
}
