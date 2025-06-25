/*
  Warnings:

  - A unique constraint covering the columns `[path_slug]` on the table `body_worm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path_slug]` on the table `cctv` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[path_slug]` on the table `helmet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "body_worm_path_slug_key" ON "body_worm"("path_slug");

-- CreateIndex
CREATE UNIQUE INDEX "cctv_path_slug_key" ON "cctv"("path_slug");

-- CreateIndex
CREATE UNIQUE INDEX "helmet_path_slug_key" ON "helmet"("path_slug");
