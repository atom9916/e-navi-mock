/*
  Warnings:

  - You are about to drop the `Daily_attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Monthly_attendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Daily_attendance";

-- DropTable
DROP TABLE "Monthly_attendance";

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tardiness" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tardiness_pkey" PRIMARY KEY ("id")
);
