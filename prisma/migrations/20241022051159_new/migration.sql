/*
  Warnings:

  - You are about to drop the column `extraInfo` on the `Testimonial` table. All the data in the column will be lost.
  - Added the required column `type` to the `ExtraInformationField` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExtraInformationField" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "logoSquare" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "extraInfo",
ADD COLUMN     "extraInformation" JSONB,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "rating" INTEGER;
