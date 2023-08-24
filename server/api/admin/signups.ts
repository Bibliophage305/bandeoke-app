import * as path from "node:path";
import * as fs from "node:fs";

export default defineEventHandler(async (event) => {
  const songs = await $fetch("/api/songs");
  const filenames = fs.readdirSync(
    path.join(process.cwd(), "static", "database")
  );
  const signups = filenames.map((filename) => {
    let signup = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "static", "database", filename))
    );
    signup.song = songs.find((song) => song.id == signup.song_id);
    signup.timestamp = path.parse(filename).name;
    return signup;
  });
  signups.sort((a, b) =>
    a.timestamp > b.timestamp ? -1 : a.timestamp < b.timestamp ? 1 : 0
  );
  return signups;
});
