export const makeAPIUrl = (path: string): string => {
  return `process.env.API_URL${path}`
}
