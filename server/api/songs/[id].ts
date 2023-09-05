export default defineEventHandler(async (event) => {
  const songs = await $fetch('/api/songs');
  const id = getRouterParam(event, 'id');
  return songs.find(song => song.id === id);
});
