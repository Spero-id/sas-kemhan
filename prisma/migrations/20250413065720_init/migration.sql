-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'public');

-- CreateTable
CREATE TABLE "auth_user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cctv" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "path_slug" TEXT NOT NULL,
    "rtsp_url" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cctv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_user_email_key" ON "auth_user"("email");

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
