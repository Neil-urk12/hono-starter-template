import { createRoute, z } from '@hono/zod-openapi'
import { apiItemsSchema, insertItemApiSchema, insertItemSchema } from '@/database/schema'
import createErrorSchema from '@/middleware/utils/create-error-schema'
import jsonContent, { jsonContentRequired } from '@/middleware/utils/json-content'
import * as httpStatusCodes from '@/openapi/http-status-codes'

const tags = ['items']

export const listOfItems = createRoute({
  path: '/items',
  method: 'get',
  tags,
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      z.array(apiItemsSchema),
      'List of items',
    ),
  },
})

export const createItem = createRoute({
  path: '/items',
  method: 'post',
  request: {
    body: jsonContentRequired(
      insertItemApiSchema,
      'The item to create',
    ),
  },
  tags,
  responses: {
    [httpStatusCodes.OK]: jsonContent(
      apiItemsSchema,
      'The created item',
    ),
    [httpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent (
      createErrorSchema(insertItemSchema),
      'The item is invalid',
    ),
  },
})

export type ListRoute = typeof listOfItems

export type CreateRoute = typeof createItem
