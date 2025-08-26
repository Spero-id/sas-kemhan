/*
  Warnings:

  - Added the required column `region_id` to the `body_worm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `cctv` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `helmet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "body_worm" ADD COLUMN     "need_convert" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "region_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "cctv" ADD COLUMN     "region_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "helmet" ADD COLUMN     "region_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "regions_name_key" ON "regions"("name");

-- AddForeignKey
ALTER TABLE "cctv" ADD CONSTRAINT "cctv_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "helmet" ADD CONSTRAINT "helmet_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_worm" ADD CONSTRAINT "body_worm_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
