/*
  Warnings:

  - You are about to drop the column `customButtonColor` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "customButtonColor",
ADD COLUMN     "customButtonColorRV" TEXT NOT NULL DEFAULT '#4F46E5',
ADD COLUMN     "customButtonColorST" TEXT NOT NULL DEFAULT '#6B7280';
