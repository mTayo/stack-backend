-- AlterTable
ALTER TABLE `Event` ADD COLUMN `frequency` ENUM('daily', 'weekly', 'monthly', 'yearly', 'custom', 'null') NULL,
    MODIFY `end_date` DATETIME(3) NULL;
