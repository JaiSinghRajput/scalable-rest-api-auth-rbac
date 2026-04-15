import bcrypt from "bcryptjs";

import { connectDatabase } from "../config/database";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { UserModel } from "../modules/user/user.model";

const seedAdmin = async (): Promise<void> => {
  await connectDatabase();

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Admin@12345";
  const adminName = process.env.ADMIN_NAME ?? "System Admin";

  const existing = await UserModel.findOne({ email: adminEmail.toLowerCase() });

  if (existing) {
    logger.info("Admin already exists");
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await UserModel.create({
    name: adminName,
    email: adminEmail.toLowerCase(),
    passwordHash,
    role: "ADMIN"
  });

  logger.info("Admin user created");
  process.exit(0);
};

seedAdmin().catch((error: unknown) => {
  logger.error({ err: error, env: env.NODE_ENV }, "Failed to seed admin user");
  process.exit(1);
});
