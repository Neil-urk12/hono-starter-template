// The custom logger function with a timestamp
export function customLogger(message: string, ...rest: string[]) {
  const timestamp = new Date().toISOString()
  console.warn(`[${timestamp}] - ${message}`, ...rest)
}
