/*
  Warnings:

  - You are about to drop the `Saveborrowid` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Saveborrowid";

-- CreateTable
CREATE TABLE "saveborrowids" (
    "code" SERIAL NOT NULL,
    "userCode" TEXT NOT NULL,
    "bookCode" TEXT NOT NULL,
    "borrowId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saveborrowids_pkey" PRIMARY KEY ("code")
);
