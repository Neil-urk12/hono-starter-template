import { createRoute, z } from '@hono/zod-openapi'
// import { apiItemsSchema } from '@/database/schema'
import { apiItemsSchema } from '@/database/schema'
import jsonContent from '@/middleware/utils/jsonContentSchema'
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

export type ListRoute = typeof listOfItems
