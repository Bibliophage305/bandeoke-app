import { eq } from "drizzle-orm";
import { settingsModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const db = drizzle(dbClient);
  const body = await readBody(event);
  const newStatus = body.status;
  const response = await db
    .update(settingsModel)
    .set({ value: newStatus })
    .where(eq(settingsModel.name, "signup_is_open"));
  return newStatus;
});
