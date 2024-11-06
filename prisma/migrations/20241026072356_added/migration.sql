-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "allowSocialShare" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "autoReward" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "redirectUrl" TEXT,
ADD COLUMN     "thankYouImage" TEXT,
ADD COLUMN     "thankYouMessage" TEXT NOT NULL DEFAULT 'Thank you so much for your shoutout! It means a ton for us! 🙏',
ADD COLUMN     "thankYouTitle" TEXT NOT NULL DEFAULT 'Thank you!';
