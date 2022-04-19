-- CreateTable
CREATE TABLE "post_contributor" (
    "id" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "post_contributor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_contributor" ADD CONSTRAINT "post_contributor_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_contributor" ADD CONSTRAINT "post_contributor_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
