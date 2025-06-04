/*
  Warnings:

  - Added the required column `lat` to the `cctv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `long` to the `cctv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cctv" ADD COLUMN     "lat" TEXT NOT NULL,
ADD COLUMN     "long" TEXT NOT NULL;
