export default defineEventHandler(async (event) => {
  const songs = await $fetch('/api/songs/all');
  const id = getRouterParam(event, 'id');
  return songs.find(song => song.id === id);
});
