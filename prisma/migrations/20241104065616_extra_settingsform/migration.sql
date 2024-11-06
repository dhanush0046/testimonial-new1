/*
  Warnings:

  - You are about to drop the column `defaultAvatarUrl` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `openGraphImageUrl` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "defaultAvatarUrl",
DROP COLUMN "openGraphImageUrl",
ADD COLUMN     "defaultAvatar" TEXT,
ADD COLUMN     "openGraphImage" TEXT;
