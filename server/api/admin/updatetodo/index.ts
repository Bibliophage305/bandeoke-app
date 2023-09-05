import { signupModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = drizzle(dbClient);
  await db
    .update(signupModel)
    .set({ to_do: body.to_do })
    .where(eq(signupModel.id, body.id));
  return "success";
});
