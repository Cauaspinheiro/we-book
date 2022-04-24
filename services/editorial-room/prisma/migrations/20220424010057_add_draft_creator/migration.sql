/*
  Warnings:

  - You are about to drop the column `isCreator` on the `writers_drafts` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `drafts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drafts" ADD COLUMN     "creatorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "writers_drafts" DROP COLUMN "isCreator";

-- AddForeignKey
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "writers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
