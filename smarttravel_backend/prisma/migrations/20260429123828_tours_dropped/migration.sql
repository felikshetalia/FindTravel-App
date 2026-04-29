/*
  Warnings:

  - You are about to drop the `OfferTour` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OfferTour" DROP CONSTRAINT "OfferTour_offerId_fkey";

-- DropForeignKey
ALTER TABLE "OfferTour" DROP CONSTRAINT "OfferTour_tourId_fkey";

-- DropForeignKey
ALTER TABLE "Tour" DROP CONSTRAINT "Tour_locationId_fkey";

-- DropTable
DROP TABLE "OfferTour";

-- DropTable
DROP TABLE "Tour";
