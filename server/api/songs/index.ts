import songs_raw from "~/static/song-manifest.json";

export default defineEventHandler((event) => {
  const songs = songs_raw.map((song_raw, index) => {
    let song = {
      title: song_raw.title,
      artist: song_raw.artist,
      id: index
    };
    song.genres = [`${Math.floor(song_raw["release-year"] / 10) * 10}s`];
    if (song_raw.christmas) {
      song.genres.push("Christmas");
    }
    if (song_raw.halloween) {
      song.genres.push("Halloween");
    }
    if (song_raw.musical) {
      song.genres.push("Musicals");
    }
    return song;
  });
  songs.sort((a, b) => {
    let textA = a.title.toUpperCase();
    let textB = b.title.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return songs;
});
