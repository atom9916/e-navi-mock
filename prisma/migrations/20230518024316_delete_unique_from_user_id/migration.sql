-- DropIndex
DROP INDEX "Daily_attendance_userId_key";

-- DropIndex
DROP INDEX "Monthly_attendance_userId_key";

-- AlterTable
ALTER TABLE "Monthly_attendance" ALTER COLUMN "month" DROP NOT NULL;
