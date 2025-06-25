import type { ZodSchema } from '@/lib/types/zod-types'

import { z } from '@hono/zod-openapi'

function createErrorSchema<
  T extends ZodSchema,
>(schema: T) {
  const { error: _error } = schema.safeParse(
    schema._def.typeName
    === z.ZodFirstPartyTypeKind.ZodArray
      ? []
      : {},
  )
  return z.object({
    success: z.boolean().openapi({
      example: false,
    }),
    error: z
      .object({
        issues: z.array(
          z.object({
            code: z.string(),
            path: z.array(
              z.union([z.string(), z.number()]),
            ),
            message: z.string().optional(),
          }),
        ),
        name: z.string(),
      })
      .openapi({
        example: {
          issues: [
            {
              code: 'invalid_type',
              path: ['name'],
              message: 'Expected string, received number',
            },
          ],
          name: 'ZodError',
        },
      }),
  })
}

export default createErrorSchema
