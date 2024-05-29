-- AlterTable
ALTER TABLE `Event` MODIFY `frequency` ENUM('daily', 'weekly', 'monthly', 'yearly', 'custom', 'null') NULL DEFAULT 'null';
