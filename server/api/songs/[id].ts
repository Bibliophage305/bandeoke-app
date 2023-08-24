export default defineEventHandler(async (event) => {
  const songs = await $fetch('/api/songs');
  const id = parseInt(getRouterParam(event, 'id'));
  if (isNaN(id)) {
    setResponseStatus(event, 400, `Invalid id parameter: ${getRouterParam(event, 'id')}`)
  }
  return songs.find(song => song.id === id);
});
