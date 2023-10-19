export const extractIdFromString = (url: string, key = 'id'): string => {
  const hasSlash = url.includes('/')
  if (!hasSlash) {
    return url
  }
  const regex = new RegExp(`${key}=(\\d+)`)
  const match = url.match(regex) || []

  return match[1]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeDuplicates = (array: any[], key: string) => {
  return Array.from(new Set(array.map((item) => item[key]))).map((keyValue) =>
    array.find((item) => item[key] === keyValue),
  )
}
