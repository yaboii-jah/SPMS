-- AlterTable
ALTER TABLE `performance` ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `ratings` ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `users` MODIFY `first_name` VARCHAR(200) NOT NULL,
    MODIFY `last_name` VARCHAR(200) NOT NULL,
    MODIFY `middle_name` VARCHAR(200) NULL,
    MODIFY `department` VARCHAR(200) NOT NULL,
    MODIFY `supervisor_division_chief` VARCHAR(200) NULL,
    MODIFY `office_director` VARCHAR(200) NULL,
    MODIFY `password` VARCHAR(200) NOT NULL,
    MODIFY `username` VARCHAR(200) NOT NULL,
    MODIFY `chairperson` VARCHAR(200) NULL,
    MODIFY `commissioner` VARCHAR(200) NULL,
    MODIFY `role` VARCHAR(200) NOT NULL;
