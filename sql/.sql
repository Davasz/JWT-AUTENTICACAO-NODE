CREATE DATABASE auth_jwt;

CREATE TABLE `auth_jwt`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(65) NOT NULL,
  PRIMARY KEY (`id`));