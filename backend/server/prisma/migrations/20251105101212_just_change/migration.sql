/*
  Warnings:

  - You are about to drop the column `balance` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyAccountNumber` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyAccountRef` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyAccountStatus` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `monnifyReservedId` on the `Wallet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TotalUser" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "monnifyAccountNumber" TEXT,
ADD COLUMN     "monnifyAccountRef" TEXT,
ADD COLUMN     "monnifyAccountStatus" TEXT,
ADD COLUMN     "monnifyReservedId" TEXT;

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "balance",
DROP COLUMN "monnifyAccountNumber",
DROP COLUMN "monnifyAccountRef",
DROP COLUMN "monnifyAccountStatus",
DROP COLUMN "monnifyReservedId";
