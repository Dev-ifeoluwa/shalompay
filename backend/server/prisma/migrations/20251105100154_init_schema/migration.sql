/*
  Warnings:

  - You are about to drop the column `balance` on the `TotalUser` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyAccountNumber` on the `TotalUser` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyAccountRef` on the `TotalUser` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyAccountStatus` on the `TotalUser` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyReservedId` on the `TotalUser` table. All the data in the column will be lost.
  - You are about to drop the column `DayPurchased` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `itemsPurchase` on the `Transaction` table. All the data in the column will be lost.
  - The `itemsTime` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REVERSED');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('AIRTIME', 'DATA', 'TV_SUBSCRIPTION', 'ELECTRICITY', 'EDUCATION', 'SPORT', 'WALLET_FUNDING');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('VTPASS', 'INTERNAL');

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "TotalUser" DROP COLUMN "balance",
DROP COLUMN "monnifyAccountNumber",
DROP COLUMN "monnifyAccountRef",
DROP COLUMN "monnifyAccountStatus",
DROP COLUMN "monnifyReservedId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "DayPurchased",
DROP COLUMN "itemsPurchase",
ADD COLUMN     "dayPurchased" TIMESTAMP(3),
ADD COLUMN     "idempotencyKey" TEXT,
ADD COLUMN     "itemsPurchased" TEXT,
ADD COLUMN     "meta" JSONB,
ADD COLUMN     "provider" "Provider",
ADD COLUMN     "providerRef" TEXT,
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "type",
ADD COLUMN     "type" "TransactionType" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
DROP COLUMN "itemsTime",
ADD COLUMN     "itemsTime" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "monnifyAccountRef" TEXT,
    "monnifyReservedId" TEXT,
    "monnifyAccountNumber" TEXT,
    "monnifyAccountStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "provider" "Provider" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userId_key" ON "Wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_idempotencyKey_key" ON "Transaction"("idempotencyKey");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TotalUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TotalUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
