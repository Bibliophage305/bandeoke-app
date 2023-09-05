import { signupModel } from "../../utils/schema";
import { dbClient } from "../../utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = drizzle(dbClient);
  await db.insert(signupModel).values({
    name: body.name,
    song_id: body.song_id,
  });
  return "success";
});
