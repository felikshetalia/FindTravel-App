/*
  Warnings:

  - The primary key for the `Accommodation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `houseNumber` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Address` table. All the data in the column will be lost.
  - The primary key for the `Airport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `iataCode` on the `Airport` table. All the data in the column will be lost.
  - The primary key for the `Flight` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[country,city]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `Accommodation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `address_id` on the `Accommodation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `house_number` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `location_id` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `iata_code` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `location_id` on the `Airport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Flight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Location` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

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

-- AlterTable
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "address_id",
ADD COLUMN     "address_id" UUID NOT NULL,
ADD CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Address" DROP CONSTRAINT "Address_pkey",
DROP COLUMN "houseNumber",
DROP COLUMN "postalCode",
ADD COLUMN     "house_number" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
DROP COLUMN "location_id",
ADD COLUMN     "location_id" UUID NOT NULL,
ADD CONSTRAINT "Address_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_pkey",
DROP COLUMN "iataCode",
ADD COLUMN     "iata_code" TEXT NOT NULL,
DROP COLUMN "location_id",
ADD COLUMN     "location_id" UUID NOT NULL,
ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("iata_code");

-- AlterTable
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Flight_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Offer" (
    "id" UUID NOT NULL,
    "description" TEXT,
    "fee" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location_id" UUID NOT NULL,
    "accommodation_id" UUID NOT NULL,
    "outbound_flight_id" UUID NOT NULL,
    "return_flight_id" UUID NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "location_id" UUID NOT NULL,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferTour" (
    "offer_id" UUID NOT NULL,
    "tour_id" UUID NOT NULL,

    CONSTRAINT "OfferTour_pkey" PRIMARY KEY ("offer_id","tour_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_country_city_key" ON "Location"("country", "city");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_from_iatacode_fkey" FOREIGN KEY ("from_iatacode") REFERENCES "Airport"("iata_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_to_iatacode_fkey" FOREIGN KEY ("to_iatacode") REFERENCES "Airport"("iata_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_outbound_flight_id_fkey" FOREIGN KEY ("outbound_flight_id") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_return_flight_id_fkey" FOREIGN KEY ("return_flight_id") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour" ADD CONSTRAINT "Tour_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTour" ADD CONSTRAINT "OfferTour_offer_id_fkey" FOREIGN KEY ("offer_id") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferTour" ADD CONSTRAINT "OfferTour_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
