/*
  Warnings:

  - Added the required column `room_id` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "room_id" TEXT NOT NULL;
