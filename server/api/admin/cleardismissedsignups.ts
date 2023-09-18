import { eq } from "drizzle-orm";
import { signupModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const db = drizzle(dbClient);
  await db.delete(signupModel).where(eq(signupModel.to_do, false));
  return "success";
});
