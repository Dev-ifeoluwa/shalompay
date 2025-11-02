-- CreateTable
CREATE TABLE "ConversionHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fromCurrency" TEXT NOT NULL,
    "toCurrency" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "convertedAmount" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversionHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConversionHistory" ADD CONSTRAINT "ConversionHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TotalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
