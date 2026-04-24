-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nights" INTEGER NOT NULL,
    "cost_per_night" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
