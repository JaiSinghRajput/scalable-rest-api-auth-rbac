import { createServer } from "http";

import { app } from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";
import { logger } from "./config/logger";

const bootstrap = async (): Promise<void> => {
  await connectDatabase();

  const server = createServer(app);
  server.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
};

bootstrap().catch((error: unknown) => {
  logger.error({ err: error }, "Failed to start server");
  process.exit(1);
});
