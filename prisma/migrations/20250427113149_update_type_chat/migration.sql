/*
  Warnings:

  - The values [IMAGE] on the enum `ChatType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChatType_new" AS ENUM ('TEXT', 'VIDEO', 'AUDIO');
ALTER TABLE "chat" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "chat" ALTER COLUMN "type" TYPE "ChatType_new" USING ("type"::text::"ChatType_new");
ALTER TYPE "ChatType" RENAME TO "ChatType_old";
ALTER TYPE "ChatType_new" RENAME TO "ChatType";
DROP TYPE "ChatType_old";
ALTER TABLE "chat" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;
