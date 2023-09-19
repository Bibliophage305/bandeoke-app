import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const settingsModel = pgTable("settings", {
  id: serial("id").primaryKey(),
  name: text("name").unique(),
  value: boolean("value"),
});

export const signupModel = pgTable("signups", {
  id: serial("id").primaryKey(),
  name: text("name"),
  song_id: text("song_id"),
  created_at: timestamp("created_at").defaultNow(),
  to_do: boolean("to_do").default(true),
});

export const hiddenCategoryModel = pgTable("hidden_categories", {
  id: serial("id").primaryKey(),
  category: text("category").unique().notNull(),
});

export const hiddenSongModel = pgTable("hidden_songs", {
  id: serial("id").primaryKey(),
  song_id: text("song_id").unique().notNull(),
});