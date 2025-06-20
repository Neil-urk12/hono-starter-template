import { createRoute, z } from '@hono/zod-openapi'
import { createRouter } from '@/lib/create-app'

const router = createRouter()
  .openapi(createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
        description: 'Root route of the API',
      },
    },
  }), (c) => {
    return c.json({
      message: 'Hono API',
    })
  })

export default router
