import { eq } from "drizzle-orm";
import { hiddenCategoryModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const categoriesToHide: string[] = body.categories;
  const db = drizzle(dbClient);
  for (let category of categoriesToHide) {
    await db.insert(hiddenCategoryModel).values({
      category: category,
    }).onConflictDoNothing();
  }
  for (let category of await db.select().from(hiddenCategoryModel)) {
    if (!categoriesToHide.includes(category.category)) {
      await db
        .delete(hiddenCategoryModel)
        .where(eq(hiddenCategoryModel.category, category.category));
    }
  }
  return "success";
});
