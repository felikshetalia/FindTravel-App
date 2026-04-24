-- CreateTable
CREATE TABLE "Flight" (
    "id" TEXT NOT NULL,
    "airline_name" TEXT NOT NULL,
    "flight_number" TEXT NOT NULL,
    "departure_time" TIMESTAMP(3) NOT NULL,
    "arrival_time" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "from_iatacode" TEXT NOT NULL,
    "to_iatacode" TEXT NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airport" (
    "iataCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location_id" TEXT NOT NULL,

    CONSTRAINT "Airport_pkey" PRIMARY KEY ("iataCode")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_from_iatacode_fkey" FOREIGN KEY ("from_iatacode") REFERENCES "Airport"("iataCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_to_iatacode_fkey" FOREIGN KEY ("to_iatacode") REFERENCES "Airport"("iataCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
