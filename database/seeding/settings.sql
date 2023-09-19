INSERT INTO "settings" ("name", "value")
VALUES ('signup_is_open', TRUE)
ON CONFLICT ("name") DO NOTHING;
