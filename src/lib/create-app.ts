import type { AppBindings } from "@/lib/types/app-types";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { customLogger } from "@/middleware/custom-logger";
import { logger as pinoLogger } from "@/middleware/pino-logger";
import notFound from "@/middleware/utils/not-found";
import onError from "@/middleware/utils/on-error";
import serveEmojiFavicon from "@/middleware/utils/serve-emoji-favicon";

export default function createApp() {
  const app = createRouter()
    // Use any of the following logger middlewares
    // .use(
    //   logger(customLogger),
    // )
    .use(pinoLogger())
    .use(serveEmojiFavicon("🔥"));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
  });
}
