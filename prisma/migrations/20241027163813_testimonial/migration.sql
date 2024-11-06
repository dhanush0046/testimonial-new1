/*
  Warnings:

  - Made the column `extraInformation` on table `Testimonial` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Testimonial" ALTER COLUMN "extraInformation" SET NOT NULL,
ALTER COLUMN "extraInformation" SET DEFAULT '[]';
