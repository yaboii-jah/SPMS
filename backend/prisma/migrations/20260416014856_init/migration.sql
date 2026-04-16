-- AlterTable
ALTER TABLE `performance` ADD COLUMN `is_submitted` VARCHAR(45) NULL DEFAULT 'False',
    ADD COLUMN `is_valid` VARCHAR(55) NULL DEFAULT 'True';

-- AlterTable
ALTER TABLE `ratings` ADD COLUMN `is_submitted` VARCHAR(45) NULL DEFAULT 'False',
    ADD COLUMN `is_valid` VARCHAR(45) NULL DEFAULT 'True';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` VARCHAR(45) NULL DEFAULT 'Active';

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
