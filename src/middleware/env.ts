import type { ZodError } from 'zod'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  DATABASE_URL: z.string().url(),
  // DATABASE_AUTH_TOKEN: z.string().optional(),
})
// .superRefine((input, ctx) => {
//   if (input.NODE_ENV === 'production' && !input.DATABASE_AUTH_TOKEN) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.invalid_type,
//       expected: 'string',
//       received: 'undefined',
//       path: ['DATABASE_AUTH_TOKEN'],
//       message: 'DATABASE_AUTH_TOKEN is required in production',
//     })
//   }
// })

export type Env = z.infer<typeof EnvSchema>

// eslint-disable-next-line import/no-mutable-exports
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
