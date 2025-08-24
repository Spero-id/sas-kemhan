/*
  Warnings:

  - Added the required column `user_id` to the `layout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "layout" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "layout" ADD CONSTRAINT "layout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
