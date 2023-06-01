/*
  Warnings:

  - You are about to drop the column `user_id` on the `Paid_off` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `Paid_off` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `Paid_off` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Paid_off_user_id_key";

-- AlterTable
ALTER TABLE "Paid_off" DROP COLUMN "user_id",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Paid_off_user_email_key" ON "Paid_off"("user_email");
