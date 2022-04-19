-- CreateTable
CREATE TABLE "post_view" (
    "id" TEXT NOT NULL,
    "viewerId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "post_view_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "post_view" ADD CONSTRAINT "post_view_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_view" ADD CONSTRAINT "post_view_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
