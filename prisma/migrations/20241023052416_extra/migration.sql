/*
  Warnings:

  - You are about to drop the column `logoSquare` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the `ExtraInformationField` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExtraInformationField" DROP CONSTRAINT "ExtraInformationField_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "logoSquare",
ADD COLUMN     "extraInformationFields" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "logoShape" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "ExtraInformationField";
