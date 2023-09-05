import songs from "~/static/songManifest.json";

export default defineEventHandler(async (event) => {
  songs.sort((a, b) => {
    let textA = a.title.toUpperCase();
    let textB = b.title.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return songs;
});
