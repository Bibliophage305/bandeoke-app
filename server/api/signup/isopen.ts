import * as path from "node:path";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
  const filename = path.join(process.cwd(), "static", "signupOpen.json");
  const isopenRaw = JSON.parse(
    fs.readFileSync(filename)
  );
  return isopenRaw.signupOpen;
});
