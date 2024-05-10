-- AlterTable
ALTER TABLE "books" ALTER COLUMN "available" SET DEFAULT true;

-- CreateTable
CREATE TABLE "blacklist" (
    "code" SERIAL NOT NULL,
    "userCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blacklist_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "blacklist" ADD CONSTRAINT "blacklist_userCode_fkey" FOREIGN KEY ("userCode") REFERENCES "users"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
