import * as path from "node:path";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  body.toDo = true;
  const filePath = path.join(process.cwd(), "database", `${Date.now()}.json`);
  fs.writeFileSync(filePath, JSON.stringify(body));
  return "success";
});
