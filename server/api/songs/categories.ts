export default defineEventHandler(async (event) => {
  const songs = await $fetch("/api/songs/all");
  return [...new Set(songs.map((song) => song.categories).flat(1))].sort();
});
