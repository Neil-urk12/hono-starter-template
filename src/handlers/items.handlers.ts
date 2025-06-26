import type { AppRouteHandler } from '@/lib/types/app-types'
import type { CreateRoute, DeleteRoute, GetOneRoute, ListRoute, PatchRoute } from '@/routes/items/items.routes'
import { eq } from 'drizzle-orm'
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

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const updates = c.req.valid('json')

  const [item] = await db.update(items)
    .set(updates)
    .where(eq(items.id, id))
    .returning()

  if (!item) {
    return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND)
  }

  return c.json(item, httpStatusCodes.OK)
}

export const remove: AppRouteHandler<DeleteRoute> = async (c) => {
  const { id } = c.req.valid('param')

  const result = await db.delete(items)
    .where(eq(items.id, id))

  if (result.rowsAffected === 0) {
    return c.json({ message: httpStatusPhrases.NOT_FOUND }, httpStatusCodes.NOT_FOUND)
  }

  return c.body(null, httpStatusCodes.NO_CONTENT)
}
