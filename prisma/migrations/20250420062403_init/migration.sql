/*
  Warnings:

  - You are about to drop the column `nama` on the `cctv` table. All the data in the column will be lost.
  - Added the required column `name` to the `cctv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cctv" DROP COLUMN "nama",
ADD COLUMN     "name" TEXT NOT NULL;
