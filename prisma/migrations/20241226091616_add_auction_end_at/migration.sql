-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "auctionEndAt" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '24 hours';
