/*
  Warnings:

  - You are about to drop the column `address_id` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `cost_per_night` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `house_number` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `postal_code` on the `Address` table. All the data in the column will be lost.
  - The primary key for the `Airport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iata_code` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `airline_name` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `arrival_time` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `departure_time` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `flight_number` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `from_iatacode` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `to_iatacode` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `accommodation_id` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `outbound_flight_id` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `return_flight_id` on the `Offer` table. All the data in the column will be lost.
  - The primary key for the `OfferTour` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `offer_id` on the `OfferTour` table. All the data in the column will be lost.
  - You are about to drop the column `tour_id` on the `OfferTour` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Accommodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costPerNight` to the `Accommodation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `houseNumber` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iataCode` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airlineName` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrivalTime` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureTime` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `flightNumber` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromIataCode` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toIataCode` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodationId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outboundFlightId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnFlightId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerId` to the `OfferTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourId` to the `OfferTour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_from_iatacode_fkey";

-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_to_iatacode_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_accommodation_id_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_location_id_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_outbound_flight_id_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_return_flight_id_fkey";

-- DropForeignKey
ALTER TABLE "OfferTour" DROP CONSTRAINT "OfferTour_offer_id_fkey";

-- DropForeignKey
ALTER TABLE "OfferTour" DROP CONSTRAINT "OfferTour_tour_id_fkey";

-- DropForeignKey
ALTER TABLE "Tour" DROP CONSTRAINT "Tour_location_id_fkey";

-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "address_id",
DROP COLUMN "cost_per_night",
ADD COLUMN     "addressId" UUID NOT NULL,
ADD COLUMN     "costPerNight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "house_number",
DROP COLUMN "location_id",
DROP COLUMN "postal_code",
ADD COLUMN     "houseNumber" TEXT NOT NULL,
ADD COLUMN     "locationId" UUID NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_pkey",
DROP COLUMN "iata_code",
DROP COLUMN "location_id",
ADD COLUMN     "iataCode" TEXT NOT NULL,
ADD COLUMN     "locationId" UUID NOT NULL,
ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("iataCode");

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "airline_name",
DROP COLUMN "arrival_time",
DROP COLUMN "departure_time",
DROP COLUMN "flight_number",
DROP COLUMN "from_iatacode",
DROP COLUMN "to_iatacode",
ADD COLUMN     "airlineName" TEXT NOT NULL,
ADD COLUMN     "arrivalTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "departureTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "flightNumber" TEXT NOT NULL,
ADD COLUMN     "fromIataCode" TEXT NOT NULL,
ADD COLUMN     "toIataCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "accommodation_id",
DROP COLUMN "created_at",
DROP COLUMN "location_id",
DROP COLUMN "outbound_flight_id",
DROP COLUMN "return_flight_id",
ADD COLUMN     "accommodationId" UUID NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "locationId" UUID NOT NULL,
ADD COLUMN     "outboundFlightId" UUID NOT NULL,
ADD COLUMN     "returnFlightId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "OfferTour" DROP CONSTRAINT "OfferTour_pkey",
DROP COLUMN "offer_id",
DROP COLUMN "tour_id",
ADD COLUMN     "offerId" UUID NOT NULL,
ADD COLUMN     "tourId" UUID NOT NULL,
ADD CONSTRAINT "OfferTour_pkey" PRIMARY KEY ("offerId", "tourId");

-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "location_id",
ADD COLUMN     "locationId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_fromIataCode_fkey" FOREIGN KEY ("fromIataCode") REFERENCES "Airport"("iataCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_toIataCode_fkey" FOREIGN KEY ("toIataCode") REFERENCES "Airport"("iataCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_outboundFlightId_fkey" FOREIGN KEY ("outboundFlightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_returnFlightId_fkey" FOREIGN KEY ("returnFlightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTour" ADD CONSTRAINT "OfferTour_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTour" ADD CONSTRAINT "OfferTour_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
