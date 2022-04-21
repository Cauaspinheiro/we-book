/*
  Warnings:

  - A unique constraint covering the columns `[urlPath]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ogCover` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlPath` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "ogCover" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "urlPath" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "posts_urlPath_key" ON "posts"("urlPath");
