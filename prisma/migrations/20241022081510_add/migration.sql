/*
  Warnings:

  - Added the required column `updatedAt` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "permissionGranted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "videoUrl" TEXT;
