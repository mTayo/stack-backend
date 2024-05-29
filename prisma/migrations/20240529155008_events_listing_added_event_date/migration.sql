/*
  Warnings:

  - Added the required column `event_date` to the `EventListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `EventListing` ADD COLUMN `event_date` DATETIME(3) NOT NULL;
