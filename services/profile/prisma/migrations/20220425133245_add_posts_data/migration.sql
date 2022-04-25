-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "totalContributions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPostsViewed" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPublications" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalViews" INTEGER NOT NULL DEFAULT 0;
