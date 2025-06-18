import type { PinoLogger } from 'hono-pino'
import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { customLogger } from './middleware/custom-logger'
import { logger as pinoLogger } from './middleware/pino-logger'
import notFound from './middleware/utils/not-found'
import onError from './middleware/utils/on-error'

interface AppBindings {
  Variables: {
    logger: PinoLogger
  }
}

const app = new OpenAPIHono<AppBindings>()
// Use any of the following logger middlewares
  // .use(
  //   logger(customLogger),
  // )
  .use(
    pinoLogger(),
  )

app.get('/', (c) => {
  c.var.logger.info('Root endpoint accessed')
  return c.text('Hello Hono!')
})

app.notFound(notFound)
app.onError(onError)

export default app
