export default defineEventHandler(async (event) => {
  const songs = await $fetch("/api/songs/all");
  songs.sort((a, b) => {
    let textA = a.title.toUpperCase();
    let textB = b.title.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  const hiddenCategories: string[] = await $fetch(
    "/api/admin/hiddencategories"
  );
  const hiddenSongIDs: string[] = (await $fetch("/api/admin/hiddensongs")).map(song => song.id);
  return songs.filter((song) => {
    if (
      hiddenCategories.some((category) => song.categories.includes(category))
    ) {
      return false;
    }
    if (hiddenSongIDs.includes(song.id)) {
      return false;
    }
    return true;
  });
});
