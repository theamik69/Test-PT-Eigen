-- CreateTable
CREATE TABLE "Saveborrowid" (
    "code" SERIAL NOT NULL,
    "userCode" TEXT NOT NULL,
    "bookCode" TEXT NOT NULL,
    "borrowId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Saveborrowid_pkey" PRIMARY KEY ("code")
);
