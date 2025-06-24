import type { AppRouteHandler } from '@/lib/types/app-types'
import type { ListRoute } from '@/routes/items/items.routes'
import db from '@/config/db'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const items = await db.query.items.findMany()
  const transformedItems = items.map(item => ({
    ...item,
    available: Boolean(item.available),
  }))
  return c.json(transformedItems)
}
