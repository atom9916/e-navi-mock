-- @block
DROP TABLE IF EXISTS "public"."Daily_attendance";
CREATE TABLE "public"."Daily_attendance" (
  id SERIAL  PRIMARY KEY NOT NULL,
  user_id UUID,
  date TIMESTAMP,
  state TEXT,
  attendance TEXT,
  punch_in INTEGER,
  punch_out INTEGER,
  break_time INTEGER,
  work_hour INTEGER,
  tardiness TEXT,
  comment TEXT
);

-- @block
CREATE TABLE "public"."User" (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE "public"."Post" (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  content TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  "authorId" INTEGER NOT NULL,
  FOREIGN KEY ("authorId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."Profile" (
  id SERIAL PRIMARY KEY NOT NULL,
  bio TEXT,
  "userId" INTEGER UNIQUE NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "public"."User"(id)
);
