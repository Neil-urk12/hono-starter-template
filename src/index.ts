import { serve } from '@hono/node-server'
import app from './app'
import env from './middleware/env'

const port = Number(env.PORT || 3000)

serve({
  fetch: app.fetch,
  port,
})
