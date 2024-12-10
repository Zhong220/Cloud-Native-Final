CREATE DATABASE IF NOT EXISTS `cns_db`;

USE `cns_db`;

-- create.sql
-- Drop tables if they exist (in correct order to avoid foreign key constraints issues)
DROP TABLE IF EXISTS `chat_in`;

DROP TABLE IF EXISTS `assign_id`;

DROP TABLE IF EXISTS `group_member`;

DROP TABLE IF EXISTS `feat_accounting`;

DROP TABLE IF EXISTS `feat_activity`;

DROP TABLE IF EXISTS `feat_plan`;

DROP TABLE IF EXISTS `identity`;

DROP TABLE IF EXISTS `tag`;

DROP TABLE IF EXISTS `channel`;

DROP TABLE IF EXISTS `groups`;

DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `event_logs`;

DROP TABLE IF EXISTS `hardware_performance_logs`;

-- Create 'user' table
CREATE TABLE
    `user` (
        `uid` VARCHAR(10) NOT NULL COMMENT 'User ID',
        `username` VARCHAR(255) NOT NULL UNIQUE,
        `email` VARCHAR(255) NOT NULL,
        `password` VARCHAR(64) NOT NULL,
        `phone` VARCHAR(10) NOT NULL,
        `description` TEXT NOT NULL,
        `icon` BLOB DEFAULT NULL,
        `birthday` DATE DEFAULT NULL,
        `gender` ENUM ('0', '1', '2') DEFAULT '2' COMMENT 'female: 0, male: 1, other: 2',
        `attend_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'groups' table
CREATE TABLE
    `groups` (
        `gid` VARCHAR(10) NOT NULL COMMENT 'Group ID',
        `group_name` VARCHAR(255) NOT NULL,
        `is_private` BOOLEAN DEFAULT FALSE,
        `icon` BLOB DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `end_time` TIMESTAMP NULL DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`gid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'channel' table
CREATE TABLE
    `channel` (
        `cid` VARCHAR(10) NOT NULL COMMENT 'Channel ID',
        `channel_name` VARCHAR(255) NOT NULL,
        `super_gid` VARCHAR(10) NOT NULL,
        `icon` BLOB DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`cid`),
        FOREIGN KEY (`super_gid`) REFERENCES `groups` (`gid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'tag' table
CREATE TABLE
    `tag` (
        `tid` VARCHAR(10) NOT NULL COMMENT 'Tag ID',
        `tag_name` VARCHAR(255) NOT NULL,
        `super_gid` VARCHAR(10) NOT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`tid`),
        FOREIGN KEY (`super_gid`) REFERENCES `groups` (`gid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'identity' table
CREATE TABLE
    `identity` (
        `rid` VARCHAR(10) NOT NULL COMMENT 'Role ID',
        `role_name` VARCHAR(255) NOT NULL,
        `super_gid` VARCHAR(10) NOT NULL,
        `icon` BLOB DEFAULT NULL,
        `color` CHAR(7) DEFAULT NULL COMMENT '#HEX',
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`rid`),
        FOREIGN KEY (`super_gid`) REFERENCES `groups` (`gid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_plan' table
CREATE TABLE
    `feat_plan` (
        `pid` VARCHAR(10) NOT NULL COMMENT 'Plan ID',
        `plan_name` VARCHAR(255) NOT NULL,
        `super_cid` VARCHAR(10) NOT NULL,
        `color` CHAR(7) DEFAULT NULL COMMENT '#HEX',
        `icon` BLOB DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`pid`),
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_activity' table
CREATE TABLE
    `feat_activity` (
        `actid` VARCHAR(10) NOT NULL COMMENT 'Activity ID',
        `activity_name` VARCHAR(255) NOT NULL,
        `super_cid` VARCHAR(10) NOT NULL,
        `start_time` TIMESTAMP NOT NULL,
        `end_time` TIMESTAMP DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`actid`),
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_accounting' table
CREATE TABLE
    `feat_accounting` (
        `accid` VARCHAR(10) NOT NULL COMMENT 'Accounting ID',
        `super_cid` VARCHAR(10) NOT NULL,
        `payer` VARCHAR(10) NOT NULL,
        `amount` DECIMAL(10, 2) NOT NULL,
        `unit` VARCHAR(3) DEFAULT 'NTD',
        `attendees_ids` TEXT NOT NULL COMMENT '[uid1],[uid2],[uid3]...',
        `description` TEXT DEFAULT NULL COMMENT '[title];[description]',
        `event_time` DATE NOT NULL,
        `is_split` BOOLEAN DEFAULT FALSE,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`accid`),
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
        FOREIGN KEY (`payer`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'group_member' table (Users join Groups)
CREATE TABLE
    `group_member` (
        `gid` VARCHAR(10) NOT NULL,
        `uid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`gid`, `uid`),
        FOREIGN KEY (`gid`) REFERENCES `groups` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Users join Groups';

-- Create 'assign_id' table (Groups assign Identities to Users)
CREATE TABLE
    `assign_id` (
        `uid` VARCHAR(10) NOT NULL,
        `rid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`uid`, `rid`),
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
        FOREIGN KEY (`rid`) REFERENCES `identity` (`rid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Groups assign Identities to Users';

-- Create 'chat_in' table (Users chat in Channels)
CREATE TABLE
    `chat_in` (
        `uid` VARCHAR(10) NOT NULL,
        `cid` VARCHAR(10) NOT NULL,
        `message` TEXT NOT NULL,
        `timestamp` TIMESTAMP NOT NULL,
        PRIMARY KEY (`uid`, `cid`, `timestamp`),
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
        FOREIGN KEY (`cid`) REFERENCES `channel` (`cid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Users chat in Channels';

-- Create 'event_logs' table
CREATE TABLE
    `event_logs` (
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `uid` VARCHAR(10) NULL,
        `event` VARCHAR(50) NOT NULL COMMENT 'API:[API], http code:[http code], description:[description]', -- Event description
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE SET NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'All event logs';

-- Create 'hardware_performance_logs' table
CREATE TABLE
    `hardware_performance_logs` (
        `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `cpu` FLOAT NOT NULL,
        `ram` FLOAT NOT NULL,
        `disk` FLOAT NOT NULL,
        `network` TEXT NULL COMMENT 'in:[in] MB/s, out:[out] MB/s' -- Network traffic in MB/s
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Hardware performance logs';