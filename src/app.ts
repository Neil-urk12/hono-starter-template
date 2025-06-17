import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { customLogger } from './middleware/custom-logger'
import notFound from './middleware/utils/not-found'
import onError from './middleware/utils/on-error'

const app = new OpenAPIHono()
  .use(
    logger(customLogger),
  )

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.notFound(notFound)
app.onError(onError)

export default app
