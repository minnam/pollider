-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema m
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema m
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `m` DEFAULT CHARACTER SET utf8 ;
USE `m` ;

-- -----------------------------------------------------
-- Table `m`.`m_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_user` ;

CREATE TABLE IF NOT EXISTS `m`.`m_user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NULL,
  `password` VARCHAR(100) NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `permission` INT NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_post_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_post_type` ;

CREATE TABLE IF NOT EXISTS `m`.`m_post_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `name_singular` VARCHAR(45) NULL,
  `name_plural` VARCHAR(45) NULL,
  `uploadable` VARCHAR(45) NULL,
  `support_image` VARCHAR(45) NULL,
  `support_audio` VARCHAR(45) NULL,
  `support_document` VARCHAR(45) NULL,
  `support_other` VARCHAR(45) NULL,
  `support_video` VARCHAR(45) NULL,
  `support_post` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_post_data_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_post_data_type` ;

CREATE TABLE IF NOT EXISTS `m`.`m_post_data_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_post` ;

CREATE TABLE IF NOT EXISTS `m`.`m_post` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parent_id` INT NULL,
  `user_id` INT NOT NULL,
  `post_type_id` INT NOT NULL,
  `post_data_type_id` INT NOT NULL,
  `commentable` INT NULL,
  `name` VARCHAR(100) NULL,
  `extension` VARCHAR(45) NULL,
  `size` INT NULL,
  `status` VARCHAR(10) NULL,
  `path` VARCHAR(200) NULL,
  `filename` VARCHAR(200) NULL,
  `container` INT NULL,
  `open` INT NULL,
  `public_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_m_post_m_user1_idx` (`user_id` ASC),
  INDEX `fk_m_post_m_post_type1_idx` (`post_type_id` ASC),
  INDEX `fk_m_post_m_post_data_type1_idx` (`post_data_type_id` ASC),
  INDEX `fk_m_post_m_post1_idx` (`parent_id` ASC),
  CONSTRAINT `fk_m_post_m_post_type1`
    FOREIGN KEY (`post_type_id`)
    REFERENCES `m`.`m_post_type` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_post_m_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `m`.`m_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_post_m_post1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `m`.`m_post` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_post_m_post_data_type1`
    FOREIGN KEY (`post_data_type_id`)
    REFERENCES `m`.`m_post_data_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_event` ;

CREATE TABLE IF NOT EXISTS `m`.`m_event` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `date` VARCHAR(45) NULL,
  `postal_code` VARCHAR(45) NULL,
  `street_number` VARCHAR(45) NULL,
  `street_name` VARCHAR(45) NULL,
  `suite_number` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `province` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `createdDate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modifiedDate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_m_event_m_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_m_event_m_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `m`.`m_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_mailing_list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_mailing_list` ;

CREATE TABLE IF NOT EXISTS `m`.`m_mailing_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `createdDate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_m_mailing_list_m_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_m_mailing_list_m_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `m`.`m_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_site`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_site` ;

CREATE TABLE IF NOT EXISTS `m`.`m_site` (
  `id` INT NOT NULL,
  `parent_id` INT NULL,
  `name` VARCHAR(45) NULL,
  `value` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_m_site_m_site1_idx` (`parent_id` ASC),
  CONSTRAINT `fk_m_site_m_site1`
    FOREIGN KEY (`parent_id`)
    REFERENCES `m`.`m_site` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_post_meta`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_post_meta` ;

CREATE TABLE IF NOT EXISTS `m`.`m_post_meta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_type_id` INT NOT NULL,
  `field` VARCHAR(45) NULL,
  `data_type` VARCHAR(300) NULL,
  `display` INT NULL,
  `main` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_m_post_meta_m_post_type1_idx` (`post_type_id` ASC),
  CONSTRAINT `fk_m_post_meta_m_post_type1`
    FOREIGN KEY (`post_type_id`)
    REFERENCES `m`.`m_post_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_message` ;

CREATE TABLE IF NOT EXISTS `m`.`m_message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(100) NULL,
  `body` MEDIUMTEXT NULL,
  `sent_date` DATETIME NULL,
  `recieved_date` DATETIME NULL,
  `created_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_date` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_m_message_m_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_m_message_m_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `m`.`m_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_analystic_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_analystic_type` ;

CREATE TABLE IF NOT EXISTS `m`.`m_analystic_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_analystic`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_analystic` ;

CREATE TABLE IF NOT EXISTS `m`.`m_analystic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `analystic_type_id` INT NOT NULL,
  `ip` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `platform` VARCHAR(45) NULL,
  `created_date` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_m_analystic_m_post1_idx` (`post_id` ASC),
  INDEX `fk_m_analystic_m_analystic_type1_idx` (`analystic_type_id` ASC),
  CONSTRAINT `fk_m_analystic_m_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `m`.`m_post` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_analystic_m_analystic_type1`
    FOREIGN KEY (`analystic_type_id`)
    REFERENCES `m`.`m_analystic_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_post_content_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_post_content_type` ;

CREATE TABLE IF NOT EXISTS `m`.`m_post_content_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `component_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_post_data`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_post_data` ;

CREATE TABLE IF NOT EXISTS `m`.`m_post_data` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `post_content_type_id` INT NOT NULL,
  `field` VARCHAR(45) NULL,
  `content` LONGTEXT NULL,
  `content_raw` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_m_post_data_m_post1_idx` (`post_id` ASC),
  INDEX `fk_m_post_data_m_poat_data_type1_idx` (`post_content_type_id` ASC),
  CONSTRAINT `fk_m_post_data_m_post1`
    FOREIGN KEY (`post_id`)
    REFERENCES `m`.`m_post` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_m_post_data_m_poat_data_type1`
    FOREIGN KEY (`post_content_type_id`)
    REFERENCES `m`.`m_post_content_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_data_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_data_type` ;

CREATE TABLE IF NOT EXISTS `m`.`m_data_type` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `m`.`m_post_cache`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `m`.`m_post_cache` ;

CREATE TABLE IF NOT EXISTS `m`.`m_post_cache` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `path` VARCHAR(200) NULL,
  `filename` VARCHAR(200) NULL,
  `extension` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
