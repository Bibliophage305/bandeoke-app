import { hiddenCategoryModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const db = drizzle(dbClient);
  const categories = await db.select().from(hiddenCategoryModel);
  return categories.map(x => x.category);
});
