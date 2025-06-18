import type { ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
})

export type Env = z.infer<typeof EnvSchema>

let env: Env

try {
  // eslint-disable-next-line node/prefer-global/process
  env = EnvSchema.parse(process.env)
}
catch (e) {
  const error = e as ZodError
  console.error('Invalid environment variables')
  console.error(error.flatten().fieldErrors)
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1)
}

export default env
