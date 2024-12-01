/*
  Warnings:

  - You are about to drop the column `language` on the `Testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `translations` on the `Testimonial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "language",
DROP COLUMN "translations",
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isLiked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSpam" BOOLEAN NOT NULL DEFAULT false;
