-- CreateTable
CREATE TABLE "layout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "layout" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "layout_pkey" PRIMARY KEY ("id")
);
