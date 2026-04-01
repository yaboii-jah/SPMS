/*
  Warnings:

  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `chairperson` VARCHAR(45) NULL,
    ADD COLUMN `commissioner` VARCHAR(45) NULL,
    ADD COLUMN `role` VARCHAR(45) NOT NULL,
    MODIFY `supervisor_division_chief` VARCHAR(45) NULL,
    MODIFY `office_director` VARCHAR(45) NULL;

-- CreateTable
CREATE TABLE `performance` (
    `performance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `key_perf` VARCHAR(255) NOT NULL,
    `succes_indic` TEXT NOT NULL,
    `alloted_budget` VARCHAR(45) NULL,
    `division_individuals_accountable` VARCHAR(255) NULL DEFAULT 'None',
    `actual_accomp` TEXT NOT NULL,
    `quality` INTEGER NOT NULL,
    `efficiency` INTEGER NOT NULL,
    `timeliness` INTEGER NOT NULL,
    `remarks` VARCHAR(255) NULL DEFAULT 'None',
    `category` VARCHAR(45) NOT NULL,
    `training_developmental_intervention` VARCHAR(255) NULL DEFAULT 'None',
    `user_id` INTEGER NOT NULL,
    `avg_per_form` VARCHAR(45) NULL,

    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`performance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ratings` (
    `rating_id` INTEGER NOT NULL AUTO_INCREMENT,
    `avg_rating` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `strat_obj_weight` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `core_sup_weight` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `unplanned_weight` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `strat_obj_final` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `core_sup_final` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `unplanned_final` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `overall_rating` DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    `adjective_rating` VARCHAR(50) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`rating_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
