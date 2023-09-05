import { signupModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const songs = await $fetch("/api/songs");
  const db = drizzle(dbClient);
  const signups = await db
    .select()
    .from(signupModel)
    .orderBy(signupModel.created_at);
  const signupsWithSongs = signups.map((signup) => {
    signup.song = songs.find((song) => song.id == signup.song_id);
    return signup;
  });
  return signupsWithSongs;
});
