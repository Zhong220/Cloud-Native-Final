CREATE DATABASE IF NOT EXISTS `cns_db`;

USE `cns_db`;

DROP TABLE IF EXISTS `accounting`;

DROP TABLE IF EXISTS `chatroom_msg`;

DROP TABLE IF EXISTS `chatroom`;

DROP TABLE IF EXISTS `user`;

-- create.sql
-- Drop tables if they exist (in correct order to avoid foreign key constraints issues)
-- Create 'user' table
CREATE TABLE
    `user` (
        `uid` INT NOT NULL AUTO_INCREMENT COMMENT 'User ID',
        `username` VARCHAR(255) NOT NULL,
        `email` VARCHAR(255) NOT NULL UNIQUE,
        `password` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    `chatroom` (
        `cid` VARCHAR(6) NOT NULL COMMENT 'chatroom ID',
        `name` VARCHAR(64) NOT NULL,
        `description` TEXT DEFAULT NULL,
        PRIMARY KEY (`cid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    `accounting` (
        `acid` INT NOT NULL AUTO_INCREMENT,
        `title` TEXT DEFAULT NULL,
        `super_cid` VARCHAR(6) NOT NULL COMMENT 'chatroom ID',
        `payer` INT NOT NULL,
        `attendees_ids` TEXT NOT NULL COMMENT '[uid1],[uid2],[uid3]...',
        `price` DECIMAL(10, 2) NOT NULL COMMENT 'NewTaiwanDollar',
        `issplited` BOOLEAN DEFAULT FALSE,
        `datetime` timestamp NOT NULL,
        PRIMARY KEY (`acid`),
        FOREIGN KEY (`super_cid`) REFERENCES `chatroom` (`cid`) ON DELETE CASCADE,
        FOREIGN KEY (`payer`) REFERENCES `user` (`uid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    `chatroom_msg` (
        `mid` INT NOT NULL AUTO_INCREMENT,
        `super_cid` VARCHAR(6) NOT NULL,
        `sender` INT NOT NULL COMMENT 'sender',
        `msg` TEXT NOT NULL,
        `times` TEXT NOT NULL,
        PRIMARY KEY (`mid`),
        FOREIGN KEY (`sender`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
        FOREIGN KEY (`super_cid`) REFERENCES `chatroom` (`cid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;