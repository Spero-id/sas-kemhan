/*
  Warnings:

  - You are about to drop the column `body_worm` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `cctv` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `sensor_gerak` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_user_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "body_worm",
DROP COLUMN "cctv",
DROP COLUMN "sensor_gerak";

-- CreateTable
CREATE TABLE "cctv" (
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "path_slug" TEXT NOT NULL,
    "rtsp_url" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cctv_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "body_worm" (
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "path_slug" TEXT NOT NULL,
    "rtsp_url" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "body_worm_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "sensor_gerak" (
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sensor_gerak_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cctv" ADD CONSTRAINT "cctv_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_worm" ADD CONSTRAINT "body_worm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor_gerak" ADD CONSTRAINT "sensor_gerak_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
