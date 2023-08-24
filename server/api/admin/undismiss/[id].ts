import * as path from "node:path";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id"));
  const filename = path.join(process.cwd(), "static", "database", `${id}.json`)
  const signup = JSON.parse(
    fs.readFileSync(filename)
  );
  signup.toDo = true;
  fs.writeFileSync(filename, JSON.stringify(signup));
  return "success"
});
