-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
