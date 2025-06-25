import type { AppRouteHandler } from '@/lib/types/app-types'
import type { CreateRoute, GetOneRoute, ListRoute } from '@/routes/items/items.routes'
import db from '@/config/db'
import { items } from '@/database/schema'
import * as httpStatusCodes from '@/openapi/http-status-codes'
import * as httpStatusPhrases from '@/openapi/http-status-phrases'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const items = await db.query.items.findMany()
  return c.json(items)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const item = c.req.valid('json')

  const [insertedItem] = await db.insert(items).values(item).returning()
  return c.json(insertedItem, httpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const item = await db.query.items.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id)
    },
  })

  if (!item) {
    return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND)
  }

  return c.json(item, httpStatusCodes.OK)
}
