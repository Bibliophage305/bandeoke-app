import { hiddenSongModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const db = drizzle(dbClient);
  const hiddenSongIDs = (await db.select().from(hiddenSongModel)).map(song => song.song_id);
  const songs = await $fetch("/api/songs/all");
  return songs.filter(song => hiddenSongIDs.includes(song.id));
});
