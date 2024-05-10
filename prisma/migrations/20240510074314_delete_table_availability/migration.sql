/*
  Warnings:

  - You are about to drop the `availabilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "availabilities" DROP CONSTRAINT "availabilities_bookCode_fkey";

-- DropTable
DROP TABLE "availabilities";
