-- AlterTable
ALTER TABLE "Daily_attendance" ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "punch_in" SET DEFAULT '9:00',
ALTER COLUMN "punch_in" SET DATA TYPE TEXT,
ALTER COLUMN "punch_out" SET DEFAULT '18:00',
ALTER COLUMN "punch_out" SET DATA TYPE TEXT,
ALTER COLUMN "break_time" SET DEFAULT '1:00',
ALTER COLUMN "break_time" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT;
