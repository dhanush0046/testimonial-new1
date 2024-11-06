/*
  Warnings:

  - The `theme` column on the `Space` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `language` column on the `Space` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `collectionType` on the `Space` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Testimonial` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CollectionType" AS ENUM ('TEXT_ONLY', 'VIDEO_ONLY', 'TEXT_AND_VIDEO');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "TestimonialType" AS ENUM ('TEXT', 'VIDEO');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'SPANISH', 'FRENCH', 'GERMAN', 'CHINESE');

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "questions" JSONB NOT NULL DEFAULT '[]',
DROP COLUMN "collectionType",
ADD COLUMN     "collectionType" "CollectionType" NOT NULL,
DROP COLUMN "theme",
ADD COLUMN     "theme" "Theme" NOT NULL DEFAULT 'LIGHT',
DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'ENGLISH';

-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "type",
ADD COLUMN     "type" "TestimonialType" NOT NULL;

-- DropTable
DROP TABLE "Question";
