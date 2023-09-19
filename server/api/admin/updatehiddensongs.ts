import { eq } from "drizzle-orm";
import { hiddenSongModel } from "~/server/utils/schema";
import { dbClient } from "~/server/utils/dbClient";
import { drizzle } from "drizzle-orm/postgres-js";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const songsToHide: string[] = body.songs;
  const db = drizzle(dbClient);
  for (let song_id of songsToHide) {
    await db.insert(hiddenSongModel).values({
      song_id: song_id,
    }).onConflictDoNothing();
  }
  for (let song of await db.select().from(hiddenSongModel)) {
    if (!songsToHide.includes(song.song_id)) {
      await db
        .delete(hiddenSongModel)
        .where(eq(hiddenSongModel.song_id, song.song_id));
    }
  }
  return "success";
});
