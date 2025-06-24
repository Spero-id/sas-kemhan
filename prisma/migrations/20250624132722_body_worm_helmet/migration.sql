/*
  Warnings:

  - The primary key for the `body_worm` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `body_worm` table. All the data in the column will be lost.
  - The primary key for the `helmet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `helmet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "body_worm" DROP CONSTRAINT "body_worm_user_id_fkey";

-- DropForeignKey
ALTER TABLE "helmet" DROP CONSTRAINT "helmet_user_id_fkey";

-- AlterTable
ALTER TABLE "body_worm" DROP CONSTRAINT "body_worm_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "body_worm_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "helmet" DROP CONSTRAINT "helmet_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "helmet_pkey" PRIMARY KEY ("id");
