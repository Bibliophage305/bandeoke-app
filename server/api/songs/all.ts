import songs from "~/static/songManifest.json";

export default defineEventHandler(async (event) => {
  return songs;
});
