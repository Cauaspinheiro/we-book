/*
  Warnings:

  - A unique constraint covering the columns `[urlPath]` on the table `drafts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "drafts_urlPath_key" ON "drafts"("urlPath");
