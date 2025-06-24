import * as handlers from '@/handlers/items.handlers'
import { createRouter } from '@/lib/create-app'
import * as routes from '@/routes/items/items.routes'

const router = createRouter()
  .openapi(routes.listOfItems, handlers.list)

export default router
