import { eq } from "drizzle-orm";
import { settingsModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const db = drizzle(dbClient);
  const signup_is_open = await db
    .select({
      value: settingsModel.value
    })
    .from(settingsModel)
    .where(eq(settingsModel.name, "signup_is_open"))
    .limit(1);
  const { value } = signup_is_open[0];
  return value;
});
