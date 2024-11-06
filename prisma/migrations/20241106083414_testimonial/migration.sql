/*
  Warnings:

  - You are about to drop the column `defaultAvatar` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "defaultAvatar";

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'ENGLISH',
ADD COLUMN     "translations" JSONB;
