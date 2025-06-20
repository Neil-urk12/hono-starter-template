import type { AppOpenAPI } from '@/lib/types/app-types'
import packageJSON from '../../package.json'

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/docs', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Hono API',
    },
  })
}
