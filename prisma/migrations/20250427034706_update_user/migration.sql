/*
  Warnings:

  - You are about to drop the column `body_warn` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "body_warn",
ADD COLUMN     "body_worm" TEXT;
