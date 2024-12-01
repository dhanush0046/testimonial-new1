-- AlterTable
ALTER TABLE "Space" ALTER COLUMN "tagsDisplayOnWall" SET DEFAULT true;

-- AlterTable
ALTER TABLE "Tag" ALTER COLUMN "isActive" SET DEFAULT true;

-- CreateTable
CREATE TABLE "WallOfLoveSettings" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "coverImage" TEXT,
    "coverImageDarkness" INTEGER NOT NULL DEFAULT 100,
    "topBannerText" TEXT NOT NULL DEFAULT 'Wall of Love',
    "topBannerTextColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "topBannerButtonText" TEXT NOT NULL DEFAULT 'Submit your testimonial',
    "topBannerButtonColor" TEXT NOT NULL DEFAULT '#4F46E5',
    "showBorder" BOOLEAN NOT NULL DEFAULT false,
    "borderRadius" TEXT NOT NULL DEFAULT 'small',
    "borderColor" TEXT NOT NULL DEFAULT '#E5E7EB',
    "borderThickness" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WallOfLoveSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WallOfLoveSettings_spaceId_key" ON "WallOfLoveSettings"("spaceId");

-- AddForeignKey
ALTER TABLE "WallOfLoveSettings" ADD CONSTRAINT "WallOfLoveSettings_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
