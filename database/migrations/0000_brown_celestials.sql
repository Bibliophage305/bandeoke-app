CREATE TABLE IF NOT EXISTS "hidden_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	CONSTRAINT "hidden_categories_category_unique" UNIQUE("category")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hidden_songs" (
	"id" serial PRIMARY KEY NOT NULL,
	"song_id" text NOT NULL,
	CONSTRAINT "hidden_songs_song_id_unique" UNIQUE("song_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"value" boolean,
	CONSTRAINT "settings_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "signups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"song_id" text,
	"created_at" timestamp DEFAULT now(),
	"to_do" boolean DEFAULT true
);
