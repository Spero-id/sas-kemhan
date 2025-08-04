/*
  Warnings:

  - You are about to drop the `sensor_gerak` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sensor_gerak" DROP CONSTRAINT "sensor_gerak_user_id_fkey";

-- DropTable
DROP TABLE "sensor_gerak";
