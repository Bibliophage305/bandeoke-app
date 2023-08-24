import * as path from "node:path";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
  const filename = path.join(process.cwd(), "static", "signupOpen.json")
  const body = await readBody(event);
  const newStatus = body.status;
  fs.writeFileSync(filename, JSON.stringify({
      signupOpen: newStatus
  }));
  return newStatus;
});
