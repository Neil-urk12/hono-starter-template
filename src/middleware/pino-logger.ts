import { pinoLogger } from 'hono-pino'
import pino from 'pino'
import * as PinoPretty from 'pino-pretty'
import env from './env'

/**
 * Creates a configured Pino logger middleware for Hono applications.
 * 
 * This function sets up structured logging using Pino with environment-aware
 * configuration. In development, it uses pretty-printing for human-readable
 * logs, while in production it outputs structured JSON logs for better
 * machine processing.
 * 
 * Features:
 * - Environment-aware log formatting (pretty in dev, JSON in production)
 * - Configurable log levels via LOG_LEVEL environment variable
 * - Automatic request ID generation using crypto.randomUUID()
 * - Integration with Hono's middleware system
 * 
 * @returns Configured Hono middleware function for logging
 * 
 * @example
 * ```typescript
 * import { logger } from '@/middleware/pino-logger'
 * 
 * const app = new Hono()
 * app.use(logger())
 * ```
 * 
 * Log levels (from most to least verbose):
 * - trace: Very detailed debug information
 * - debug: Debug information
 * - info: General information (default)
 * - warn: Warning messages
 * - error: Error messages
 * - fatal: Fatal error messages
 * - silent: No logging
 */
export function logger() {
  return pinoLogger({
    pino: pino({
      level: env.LOG_LEVEL || 'info',
    }, env.NODE_ENV === 'production' ? undefined : PinoPretty.PinoPretty()),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  })
}
