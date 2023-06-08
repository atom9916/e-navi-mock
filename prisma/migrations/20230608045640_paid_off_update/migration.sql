/*
  Warnings:

  - You are about to drop the column `user_email` on the `Paid_off` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Paid_off` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Paid_off` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Paid_off_user_email_key";

-- AlterTable
ALTER TABLE "Paid_off" DROP COLUMN "user_email",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Shift" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Shift_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paid_off_user_id_key" ON "Paid_off"("user_id");
