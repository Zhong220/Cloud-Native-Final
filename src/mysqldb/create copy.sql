CREATE DATABASE IF NOT EXISTS `cns2_db`;

USE `cns2_db`;

DROP TABLE IF EXISTS `split`;
DROP TABLE IF EXISTS `member`;
DROP TABLE IF EXISTS `chatroom`;
DROP TABLE IF EXISTS `user`;
-- create.sql
-- Drop tables if they exist (in correct order to avoid foreign key constraints issues)

-- Create 'user' table
CREATE TABLE
    `user` (
        `uid` INT NOT NULL AUTO_INCREMENT COMMENT 'User ID',
        `username` VARCHAR(255) NOT NULL UNIQUE,
        `email` VARCHAR(255) NOT NULL,
        `password` VARCHAR(64) NOT NULL,
        PRIMARY KEY (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    `chatroom` (
        `cid` INT NOT NULL AUTO_INCREMENT COMMENT 'chatroom ID',
        `name` VARCHAR(64) NOT NULL,
        `description` TEXT DEFAULT NULL,
        PRIMARY KEY (`cid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;



CREATE TABLE
    `accounting` (
        `acid` INT NOT NULL AUTO_INCREMENT,
        `title` TEXT DEFAULT NULL,
        `super_cid` INT NOT NULL COMMENT 'chatroom ID',
        `payer` INT NOT NULL,
        `attendees_ids` TEXT NOT NULL COMMENT '[uid1],[uid2],[uid3]...',
        `price` DECIMAL(10, 2) NOT NULL COMMENT 'NewTaiwanDollar',
        `issplited` BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (`acid`),
        FOREIGN KEY (`super_cid`) REFERENCES `chatroom` (`cid`) ON DELETE CASCADE,
        FOREIGN KEY (`payer`) REFERENCES `user` (`uid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE
    `chatroom_msg` (
        `name` VARCHAR(64) NOT NULL,
        `sender` INT NOT NULL,
        `msg` TEXT NOT NULL,
        
    )

-- CREATE TABLE
--     `member` (
--         `cid` INT NOT NULL  COMMENT 'chatroom ID',
--         `uid` INT NOT NULL  COMMENT 'User ID',
--         PRIMARY KEY (`cid`, `uid`),
--         FOREIGN KEY (`cid`) REFERENCES `chatroom` (`cid`) ON DELETE CASCADE,
--         FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE 
--     ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;