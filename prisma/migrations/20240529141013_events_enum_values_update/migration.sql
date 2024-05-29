/*
  Warnings:

  - Made the column `frequency` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `frequency` ENUM('daily', 'weekly', 'monthly', 'yearly', 'custom', 'null') NOT NULL DEFAULT 'null';
