-- CreateTable
CREATE TABLE "drafts" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drafts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "writers_drafts" (
    "id" TEXT NOT NULL,
    "draftId" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,

    CONSTRAINT "writers_drafts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "writers_drafts" ADD CONSTRAINT "writers_drafts_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "writers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writers_drafts" ADD CONSTRAINT "writers_drafts_draftId_fkey" FOREIGN KEY ("draftId") REFERENCES "drafts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
