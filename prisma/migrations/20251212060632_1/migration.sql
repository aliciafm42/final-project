-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_userId_fkey";

-- AlterTable
ALTER TABLE "Recommendation" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
