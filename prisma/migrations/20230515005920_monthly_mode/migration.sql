/*
  Warnings:

  - You are about to drop the column `user_id` on the `Daily_attendance` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(30)`.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Daily_attendance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Daily_attendance` table without a default value. This is not possible if the table is not empty.
  - Made the column `state` on table `Daily_attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `attendance` on table `Daily_attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `punch_in` on table `Daily_attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `punch_out` on table `Daily_attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `break_time` on table `Daily_attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `work_hour` on table `Daily_attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tardiness` on table `Daily_attendance` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `departmentId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- AlterTable
ALTER TABLE "Daily_attendance" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "state" SET DEFAULT '未入力',
ALTER COLUMN "attendance" SET NOT NULL,
ALTER COLUMN "attendance" SET DEFAULT '出勤',
ALTER COLUMN "punch_in" SET NOT NULL,
ALTER COLUMN "punch_in" SET DEFAULT 9,
ALTER COLUMN "punch_out" SET NOT NULL,
ALTER COLUMN "punch_out" SET DEFAULT 18,
ALTER COLUMN "break_time" SET NOT NULL,
ALTER COLUMN "break_time" SET DEFAULT 1,
ALTER COLUMN "work_hour" SET NOT NULL,
ALTER COLUMN "work_hour" SET DEFAULT 8,
ALTER COLUMN "tardiness" SET NOT NULL,
ALTER COLUMN "tardiness" SET DEFAULT 'なし';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departmentId" INTEGER NOT NULL,
ADD COLUMN     "password" VARCHAR(30) NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_PostToTag";

-- CreateTable
CREATE TABLE "Monthly_attendance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "month" TIMESTAMP(6) NOT NULL,
    "attendanceAmount" INTEGER NOT NULL DEFAULT 0,
    "absenceAmount" INTEGER NOT NULL DEFAULT 0,
    "paidOffAmount" INTEGER NOT NULL DEFAULT 0,
    "holidayWorkAmount" INTEGER NOT NULL DEFAULT 0,
    "tardinessAmount" INTEGER NOT NULL DEFAULT 0,
    "basicWorkAmount" INTEGER NOT NULL DEFAULT 0,
    "overWorkAmount" INTEGER NOT NULL DEFAULT 0,
    "monthlyWorkAmount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Monthly_attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Monthly_attendance_userId_key" ON "Monthly_attendance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Daily_attendance_userId_key" ON "Daily_attendance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- AddForeignKey
ALTER TABLE "Daily_attendance" ADD CONSTRAINT "Daily_attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monthly_attendance" ADD CONSTRAINT "Monthly_attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
