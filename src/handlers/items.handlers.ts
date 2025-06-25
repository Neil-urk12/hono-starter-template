import type { AppRouteHandler } from '@/lib/types/app-types'
import type { CreateRoute, ListRoute } from '@/routes/items/items.routes'
import db from '@/config/db'
import { items } from '@/database/schema'
import * as httpStatusCodes from '@/openapi/http-status-codes'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const items = await db.query.items.findMany()
  return c.json(items)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const item = c.req.valid('json')

  const [insertedItem] = await db.insert(items).values(item).returning()
  return c.json(insertedItem, httpStatusCodes.OK)
}
