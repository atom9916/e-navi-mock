-- CreateTable
CREATE TABLE "Paid_off" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_amount" INTEGER NOT NULL DEFAULT 10,
    "used_amount" INTEGER NOT NULL DEFAULT 0,
    "remaining_amount" INTEGER NOT NULL DEFAULT 10,

    CONSTRAINT "Paid_off_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,
    "content" TEXT,
    "create_user" INTEGER NOT NULL,
    "read_user" INTEGER[],

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paid_off_user_id_key" ON "Paid_off"("user_id");
