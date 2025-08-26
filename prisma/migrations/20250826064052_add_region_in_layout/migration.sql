/*
  Warnings:

  - Added the required column `region_id` to the `layout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "layout" ADD COLUMN     "region_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "layout" ADD CONSTRAINT "layout_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
