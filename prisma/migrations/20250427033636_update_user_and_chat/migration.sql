/*
  Warnings:

  - You are about to drop the `cctv` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO', 'AUDIO');

-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "type" "ChatType" NOT NULL DEFAULT 'TEXT';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "body_warn" TEXT,
ADD COLUMN     "cctv" TEXT,
ADD COLUMN     "sensor_gerak" TEXT;

-- DropTable
DROP TABLE "cctv";
