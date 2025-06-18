import { pinoLogger } from 'hono-pino'
import pino from 'pino'
import * as PinoPretty from 'pino-pretty'
import env from './env'

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
