/*
  Warnings:

  - Added the required column `title` to the `drafts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drafts" ADD COLUMN     "description" TEXT,
ADD COLUMN     "ogCover" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "urlPath" TEXT;
