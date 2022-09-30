CREATE DATABASE IF NOT EXISTS `carapp`;
USE `carapp`;

CREATE TABLE IF NOT EXISTS brand (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (`id`)
);

INSERT INTO brand (name) VALUES ('Honda'), ('KIA'), ('Ford'), ('Nissan');

CREATE TABLE IF NOT EXISTS model (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `brandId` INT NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (`id`),
  CONSTRAINT `brandId`
    FOREIGN KEY (`brandId`)
    REFERENCES `carapp`.`brand` (`id`)
);

INSERT INTO carapp.model (name, brandId) VALUES ('CRV', 1), ('HRV', 1), ('BRV', 1);
INSERT INTO carapp.model (name, brandId) VALUES ('SOUL', 2), ('RIO', 2), ('SPORTAGE', 2);
INSERT INTO carapp.model (name, brandId) VALUES ('MUSTANG', 3), ('ESCAPE', 3), ('FIESTA', 3);
INSERT INTO carapp.model (name, brandId) VALUES ('VERSA', 4), ('MARCH', 4), ('SENTRA', 4);

CREATE TABLE IF NOT EXISTS person (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `phoneNumber` VARCHAR(45) NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (`id`)
);


CREATE TABLE IF NOT EXISTS car (
  `id` INT NOT NULL AUTO_INCREMENT,
  `modelId` INT NOT NULL,
  `personId` INT NOT NULL,
  `active` BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (`id`),
  CONSTRAINT `modelId`
    FOREIGN KEY (`modelId`)
    REFERENCES `carapp`.`model` (`id`),
  CONSTRAINT `personId`
    FOREIGN KEY (`personId`)
    REFERENCES `carapp`.`person` (`id`)
)