﻿CREATE DATABASE verseny
	CHARACTER SET utf8
	COLLATE utf8_general_ci;

CREATE TABLE verseny.students (
  Id INT(11) NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) DEFAULT NULL,
  TestScore VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (Id)
)
ENGINE = INNODB;

CREATE TABLE verseny.`competition board` (
  studentId INT(11) DEFAULT NULL,
  Ranking VARCHAR(255) DEFAULT NULL,
  competitionId INT(11) DEFAULT NULL
)
ENGINE = INNODB;

CREATE TABLE verseny.competitions (
  Id INT(11) NOT NULL AUTO_INCREMENT,
  competitionName VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (Id)
)
ENGINE = INNODB;




