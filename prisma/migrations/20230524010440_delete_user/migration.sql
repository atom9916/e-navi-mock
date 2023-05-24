/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Daily_attendance" DROP CONSTRAINT "Daily_attendance_userId_fkey";

-- DropForeignKey
ALTER TABLE "Monthly_attendance" DROP CONSTRAINT "Monthly_attendance_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_departmentId_fkey";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "User";
