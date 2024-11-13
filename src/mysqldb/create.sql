-- checka database exit and use it
CREATE DATABASE IF NOT EXISTS `CNS_DB`;

USE `CNS_DB`;

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
<<<<<<< HEAD
<<<<<<< HEAD
        `super_gid` VARCHAR(10) NOT NULL,
=======
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        `super_gid` VARCHAR(10) NOT NULL,
>>>>>>> b5cd74d (Squashed commit of the following:)
        `icon` BLOB DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`cid`),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        FOREIGN KEY (`super_gid`) REFERENCES `groups` (`gid`),
=======
        FOREIGN KEY (`super_gid`) REFERENCES `group` (`gid`),
>>>>>>> b1cc8d9 (Squashed commit of the following:)
=======
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        FOREIGN KEY (`super_gid`) REFERENCES `group` (`gid`),
>>>>>>> b5cd74d (Squashed commit of the following:)
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'tag' table
CREATE TABLE
    `tag` (
        `tid` VARCHAR(10) NOT NULL COMMENT 'Tag ID',
        `tag_name` VARCHAR(255) NOT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        `super_gid` VARCHAR(10) NOT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`tid`),
        FOREIGN KEY (`super_gid`) REFERENCES `groups` (`gid`)
=======
        `super_gid` VARCHAR(10) NOT NULL `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`tid`) FOREIGN KEY (`super_gid`) REFERENCES `group` (`gid`)
>>>>>>> b1cc8d9 (Squashed commit of the following:)
=======
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`tid`)
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        `super_gid` VARCHAR(10) NOT NULL `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`tid`) FOREIGN KEY (`super_gid`) REFERENCES `group` (`gid`)
>>>>>>> b5cd74d (Squashed commit of the following:)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'identity' table
CREATE TABLE
    `identity` (
        `rid` VARCHAR(10) NOT NULL COMMENT 'Role ID',
        `role_name` VARCHAR(255) NOT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
        `super_gid` VARCHAR(10) NOT NULL,
<<<<<<< HEAD
        `icon` BLOB DEFAULT NULL,
=======
=======
        `super_gid` VARCHAR(10) NOT NULL,
>>>>>>> b5cd74d (Squashed commit of the following:)
        `icon` BLOB NOT NULL,
>>>>>>> b1cc8d9 (Squashed commit of the following:)
=======
        `icon` BLOB NOT NULL,
>>>>>>> 67f4359 (Squashed commit of the following:)
        `color` CHAR(7) DEFAULT NULL COMMENT '#HEX',
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`rid`),
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        FOREIGN KEY (`super_gid`) REFERENCES `groups` (`gid`),
=======
        FOREIGN KEY (`super_gid`) REFERENCES `group` (`gid`),
>>>>>>> b1cc8d9 (Squashed commit of the following:)
=======
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        FOREIGN KEY (`super_gid`) REFERENCES `group` (`gid`),
>>>>>>> b5cd74d (Squashed commit of the following:)
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_plan' table
CREATE TABLE
    `feat_plan` (
        `pid` VARCHAR(10) NOT NULL COMMENT 'Plan ID',
        `plan_name` VARCHAR(255) NOT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
        `super_cid` VARCHAR(10) NOT NULL,
        `color` CHAR(7) DEFAULT NULL COMMENT '#HEX',
        `icon` BLOB DEFAULT NULL,
=======
=======
        `super_cid` VARCHAR(10) NOT NULL,
>>>>>>> b5cd74d (Squashed commit of the following:)
        `color` CHAR(7) DEFAULT NULL COMMENT '#HEX',
        `icon` BLOB NOT NULL,
>>>>>>> 67f4359 (Squashed commit of the following:)
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`pid`),
<<<<<<< HEAD
<<<<<<< HEAD
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
=======
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
>>>>>>> b5cd74d (Squashed commit of the following:)
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_activity' table
CREATE TABLE
    `feat_activity` (
<<<<<<< HEAD
<<<<<<< HEAD
        `actid` VARCHAR(10) NOT NULL COMMENT 'Activity ID',
        `activity_name` VARCHAR(255) NOT NULL,
        `super_cid` VARCHAR(10) NOT NULL,
=======
        `aid` VARCHAR(10) NOT NULL COMMENT 'Activity ID',
        `activity_name` VARCHAR(255) NOT NULL,
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        `actid` VARCHAR(10) NOT NULL COMMENT 'Activity ID',
        `activity_name` VARCHAR(255) NOT NULL,
        `super_cid` VARCHAR(10) NOT NULL,
>>>>>>> b5cd74d (Squashed commit of the following:)
        `start_time` TIMESTAMP NOT NULL,
        `end_time` TIMESTAMP DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
        PRIMARY KEY (`actid`),
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
=======
        PRIMARY KEY (`aid`),
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        PRIMARY KEY (`actid`),
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
>>>>>>> b5cd74d (Squashed commit of the following:)
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_accounting' table
CREATE TABLE
    `feat_accounting` (
<<<<<<< HEAD
<<<<<<< HEAD
        `accid` VARCHAR(10) NOT NULL COMMENT 'Accounting ID',
        `super_cid` VARCHAR(10) NOT NULL,
        `payer` VARCHAR(10) NOT NULL,
        `amount` DECIMAL(10, 2) NOT NULL,
        `unit` VARCHAR(3) DEFAULT 'NTD',
        `attendees_ids` TEXT NOT NULL COMMENT '[uid1],[uid2],[uid3]...',
        `description` TEXT DEFAULT NULL COMMENT '[title];[description];[event_time]',
=======
        `acid` VARCHAR(10) NOT NULL COMMENT 'Accounting ID',
=======
        `accid` VARCHAR(10) NOT NULL COMMENT 'Accounting ID',
        `super_cid` VARCHAR(10) NOT NULL,
>>>>>>> b5cd74d (Squashed commit of the following:)
        `payer` VARCHAR(10) NOT NULL,
        `amount` DECIMAL(10, 2) NOT NULL,
        `unit` VARCHAR(3) DEFAULT 'NTD',
<<<<<<< HEAD
        `attendees_ids` TEXT NOT NULL COMMENT 'Comma-separated attendee IDs',
        `description` TEXT DEFAULT NULL,
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        `attendees_ids` TEXT NOT NULL COMMENT '[uid1],[uid2],[uid3]...',
        `description` TEXT DEFAULT NULL COMMENT '[title];[description];[event_time]',
>>>>>>> b5cd74d (Squashed commit of the following:)
        `event_time` DATE NOT NULL,
        `is_split` BOOLEAN DEFAULT FALSE,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
        PRIMARY KEY (`accid`),
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
=======
        PRIMARY KEY (`acid`),
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        PRIMARY KEY (`accid`),
        FOREIGN KEY (`super_cid`) REFERENCES `channel` (`cid`),
>>>>>>> b5cd74d (Squashed commit of the following:)
        FOREIGN KEY (`payer`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'group_member' table (Users join Groups)
CREATE TABLE
    `group_member` (
        `gid` VARCHAR(10) NOT NULL,
        `uid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`gid`, `uid`),
<<<<<<< HEAD
        FOREIGN KEY (`gid`) REFERENCES `groups` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Users join Groups';

-- Create 'assign_id' table (Groups assign Identities to Users)
CREATE TABLE
    `assign_id` (
        `uid` VARCHAR(10) NOT NULL,
        `rid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`uid`, `rid`),
=======
        FOREIGN KEY (`gid`) REFERENCES `group` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Users join Groups';

-- Create 'assign_id' table (Groups assign Identities to Users)
CREATE TABLE
    `assign_id` (
        `uid` VARCHAR(10) NOT NULL,
        `rid` VARCHAR(10) NOT NULL,
<<<<<<< HEAD
        PRIMARY KEY (`gid`, `uid`, `rid`),
        FOREIGN KEY (`gid`) REFERENCES `group` (`gid`) ON DELETE CASCADE,
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
        PRIMARY KEY (`uid`, `rid`),
>>>>>>> b5cd74d (Squashed commit of the following:)
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
        FOREIGN KEY (`rid`) REFERENCES `identity` (`rid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Groups assign Identities to Users';

<<<<<<< HEAD
<<<<<<< HEAD
=======
-- Create 'group_label' table (Associates Tags with Groups)
CREATE TABLE
    `group_label` (
        `gid` VARCHAR(10) NOT NULL,
        `tid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`gid`, `tid`),
        FOREIGN KEY (`gid`) REFERENCES `group` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`tid`) REFERENCES `tag` (`tid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Associates Tags with Groups';

>>>>>>> 67f4359 (Squashed commit of the following:)
=======
>>>>>>> b5cd74d (Squashed commit of the following:)
-- Create 'chat_in' table (Users chat in Channels)
CREATE TABLE
    `chat_in` (
        `uid` VARCHAR(10) NOT NULL,
<<<<<<< HEAD
<<<<<<< HEAD
        `rid` VARCHAR(10) NOT NULL,
        `cid` VARCHAR(10) NOT NULL,
        `message` TEXT NOT NULL,
        `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`uid`, `rid`, `cid`, `timestamp`),
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
        FOREIGN KEY (`rid`) REFERENCES `identity` (`rid`) ON DELETE CASCADE,
        FOREIGN KEY (`cid`) REFERENCES `channel` (`cid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Users chat in Channels';

-- fake data rule:
-- 1. 3 different groups
-- 2. 4 channels, 3 Identities and 3 Tags in each groups
-- 3. every channel has 3 Activities, 10 Accounting records and 0 ~ 2 Plans
-- 4. 10 users can simultaneously join 3 different groups, and each user can be assigned multiple different Identities within each groups.
-- 5. Each user within the groups can access any Channels.
-- 6. Each user within the channel can send messages to other users within the channel
-- 7. Users can chat in multiple Channels simultaneously.
-- 8. Each user within the channel can create or update Plans and Activities
-- 9. Each user within the channel can create Accounting records
-- 10. Each user within the channel can be the payer in any Accounting records within the channel
-- 11. attendees_ids is formed as "U001,U002,U003....."
-- 12. Each user within the channel can be the attendee in any Accounting records within the channel

<<<<<<< HEAD
-- Insert data into 'user' table
INSERT INTO `user` VALUES
('U001', 'user1', 'user1@example.com', 'c2b7e8d7a4c236b06b9ab7d1ad2d2f0c16e0590da4d6e5fb10f194b48e59bf4a', '1234567890', 'User 1 description', NULL, '1990-01-01', '0', NOW(), NULL),
('U002', 'user2', 'user2@example.com', '6b3a55e0261b0304143a9a035ad9286e45f864c6fa56f09459048caa8b196f31', '1234567891', 'User 2 description', NULL, '1991-02-02', '1', NOW(), NULL),
('U003', 'user3', 'user3@example.com', 'af7c3f4f72524e1dc1262f69835f0a580f832e0916c70131acbafaa78a81a9a1', '1234567892', 'User 3 description', NULL, '1992-03-03', '2', NOW(), NULL),
('U004', 'user4', 'user4@example.com', '3d6f46dc79fa5f9aa990c00fbf84dc607efac741e6206162a8f55122fa5301b0', '1234567893', 'User 4 description', NULL, '1993-04-04', '0', NOW(), NULL),
('U005', 'user5', 'user5@example.com', '31e16fa6eb186b2a0e3c0ba75d28e9b5c5b16e72985eea0a04911a02dc532538', '1234567894', 'User 5 description', NULL, '1994-05-05', '1', NOW(), NULL),
('U006', 'user6', 'user6@example.com', '371c7e4d61941e0b69ca92051e0f72e4e8309f2fa323383d5c6e35516b8a5662', '1234567895', 'User 6 description', NULL, '1995-06-06', '2', NOW(), NULL),
('U007', 'user7', 'user7@example.com', 'ecb47222e7f7d6f3882d77f43aa58207d164b8da234ed4ae0cf9d7a61f8a6342', '1234567896', 'User 7 description', NULL, '1996-07-07', '0', NOW(), NULL),
('U008', 'user8', 'user8@example.com', '2af6a6edaf0ddba8e1dfe55d3d8110f163d9a3e99964f0afc3fb969f0b3d9f4d', '1234567897', 'User 8 description', NULL, '1997-08-08', '1', NOW(), NULL),
('U009', 'user9', 'user9@example.com', '979026f4dc45d8a77eb6920fbab4bf5068e1481041b4eb95a48f8e446e7d50b0', '1234567898', 'User 9 description', NULL, '1998-09-09', '2', NOW(), NULL),
('U010', 'user10', 'user10@example.com', '669168ce8ff9a1e6e11cc24c4054f6b86e4e3d8d4ec03c9e64a2635fa17bf5b1', '1234567899', 'User 10 description', NULL, '1999-10-10', '0', NOW(), NULL);

-- Insert data into 'groups' table
INSERT INTO `groups` VALUES
('G001', 'Group Alpha', FALSE, NULL, 'This is Group Alpha.', NULL, NOW(), 'U001', NULL, NULL),
('G002', 'Group Beta', TRUE, NULL, 'This is Group Beta.', NULL, NOW(), 'U002', NULL, NULL),
('G003', 'Group Gamma', FALSE, NULL, 'This is Group Gamma.', NULL, NOW(), 'U003', NULL, NULL);

-- Insert data into 'channel' table
INSERT INTO `channel` VALUES
('C001', 'Alpha General', 'G001', NULL, 'General discussion for Group Alpha.', NOW(), 'U001', NULL, NULL),
('C002', 'Alpha Projects', 'G001', NULL, 'Project discussions for Group Alpha.', NOW(), 'U002', NULL, NULL),
('C003', 'Alpha Events', 'G001', NULL, 'Event planning for Group Alpha.', NOW(), 'U003', NULL, NULL),
('C004', 'Alpha Random', 'G001', NULL, 'Random talks for Group Alpha.', NOW(), 'U004', NULL, NULL),
('C005', 'Beta General', 'G002', NULL, 'General discussion for Group Beta.', NOW(), 'U002', NULL, NULL),
('C006', 'Beta Projects', 'G002', NULL, 'Project discussions for Group Beta.', NOW(), 'U005', NULL, NULL),
('C007', 'Beta Events', 'G002', NULL, 'Event planning for Group Beta.', NOW(), 'U006', NULL, NULL),
('C008', 'Beta Random', 'G002', NULL, 'Random talks for Group Beta.', NOW(), 'U003', NULL, NULL),
('C009', 'Gamma General', 'G003', NULL, 'General discussion for Group Gamma.', NOW(), 'U003', NULL, NULL),
('C010', 'Gamma Projects', 'G003', NULL, 'Project discussions for Group Gamma.', NOW(), 'U007', NULL, NULL),
('C011', 'Gamma Events', 'G003', NULL, 'Event planning for Group Gamma.', NOW(), 'U008', NULL, NULL),
('C012', 'Gamma Random', 'G003', NULL, 'Random talks for Group Gamma.', NOW(), 'U009', NULL, NULL);

=======
=======
        `rid` VARCHAR(10) NOT NULL,
>>>>>>> b5cd74d (Squashed commit of the following:)
        `cid` VARCHAR(10) NOT NULL,
        `message` TEXT NOT NULL,
        `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`uid`, `rid`, `cid`, `timestamp`),
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
        FOREIGN KEY (`rid`) REFERENCES `identity` (`rid`) ON DELETE CASCADE,
        FOREIGN KEY (`cid`) REFERENCES `channel` (`cid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Users chat in Channels';

-- Insert data into 'user' table
INSERT INTO
    `user`
VALUES
    (
        'U001',
        'user1',
        'user1@example.com',
        'c2b7e8d7a4c236b06b9ab7d1ad2d2f0c16e0590da4d6e5fb10f194b48e59bf4a',
        '1234567890',
        'User 1 description',
        NULL,
        '1990-01-01',
        '0',
        NOW (),
        NULL
    ),
    (
        'U002',
        'user2',
        'user2@example.com',
        '6b3a55e0261b0304143a9a035ad9286e45f864c6fa56f09459048caa8b196f31',
        '1234567891',
        'User 2 description',
        NULL,
        '1991-02-02',
        '1',
        NOW (),
        NULL
    ),
    (
        'U003',
        'user3',
        'user3@example.com',
        'af7c3f4f72524e1dc1262f69835f0a580f832e0916c70131acbafaa78a81a9a1',
        '1234567892',
        'User 3 description',
        NULL,
        '1992-03-03',
        '2',
        NOW (),
        NULL
    ),
    (
        'U004',
        'user4',
        'user4@example.com',
        '3d6f46dc79fa5f9aa990c00fbf84dc607efac741e6206162a8f55122fa5301b0',
        '1234567893',
        'User 4 description',
        NULL,
        '1993-04-04',
        '0',
        NOW (),
        NULL
    ),
    (
        'U005',
        'user5',
        'user5@example.com',
        '31e16fa6eb186b2a0e3c0ba75d28e9b5c5b16e72985eea0a04911a02dc532538',
        '1234567894',
        'User 5 description',
        NULL,
        '1994-05-05',
        '1',
        NOW (),
        NULL
    ),
    (
        'U006',
        'user6',
        'user6@example.com',
        '371c7e4d61941e0b69ca92051e0f72e4e8309f2fa323383d5c6e35516b8a5662',
        '1234567895',
        'User 6 description',
        NULL,
        '1995-06-06',
        '2',
        NOW (),
        NULL
    ),
    (
        'U007',
        'user7',
        'user7@example.com',
        'ecb47222e7f7d6f3882d77f43aa58207d164b8da234ed4ae0cf9d7a61f8a6342',
        '1234567896',
        'User 7 description',
        NULL,
        '1996-07-07',
        '0',
        NOW (),
        NULL
    ),
    (
        'U008',
        'user8',
        'user8@example.com',
        '2af6a6edaf0ddba8e1dfe55d3d8110f163d9a3e99964f0afc3fb969f0b3d9f4d',
        '1234567897',
        'User 8 description',
        NULL,
        '1997-08-08',
        '1',
        NOW (),
        NULL
    ),
    (
        'U009',
        'user9',
        'user9@example.com',
        '979026f4dc45d8a77eb6920fbab4bf5068e1481041b4eb95a48f8e446e7d50b0',
        '1234567898',
        'User 9 description',
        NULL,
        '1998-09-09',
        '2',
        NOW (),
        NULL
    ),
    (
        'U010',
        'user10',
        'user10@example.com',
        '669168ce8ff9a1e6e11cc24c4054f6b86e4e3d8d4ec03c9e64a2635fa17bf5b1',
        '1234567899',
        'User 10 description',
        NULL,
        '1999-10-10',
        '0',
        NOW (),
        NULL
    );

<<<<<<< HEAD
-- Insert data into 'group' table
INSERT INTO
    `group`
VALUES
    (
        'G001',
        'Test Group 1',
        FALSE,
        NULL,
        'This is the first test group.',
        NULL,
        NOW (),
        'U001',
        NULL,
        NULL
    ),
    (
        'G002',
        'Test Group 2',
        TRUE,
        NULL,
        'This is the second test group.',
        NULL,
        NOW (),
        'U002',
        NULL,
        NULL
    );

-- Insert data into 'channel' table
INSERT INTO
    `channel`
VALUES
    (
        'C001',
        'General Chat',
        NULL,
        NULL,
        NOW (),
        'U001',
        NULL,
        NULL
    ),
    (
        'C002',
        'Announcements',
        NULL,
        NULL,
        NOW (),
        'U002',
        NULL,
        NULL
    );
>>>>>>> 67f4359 (Squashed commit of the following:)

-- Insert data into 'tag' table
INSERT INTO
    `tag`
VALUES
    ('T001', 'Important', NOW ()),
    ('T002', 'Urgent', NOW ());

-- Insert data into 'identity' table
INSERT INTO
    `identity`
VALUES
    (
        'R001',
        'Admin',
        NULL,
        '#FF0000',
        'Administrator role.',
        NOW (),
        NULL,
        NULL
    ),
    (
        'R002',
        'Member',
        NULL,
        '#00FF00',
        'Member role.',
        NOW (),
        NULL,
        NULL
    );

-- Insert data into 'feat_plan' table
INSERT INTO
    `feat_plan`
VALUES
    (
        'P001',
        'Project Plan',
        '#0000FF',
        NULL,
        'Plan for the project.',
        NOW (),
        'U001',
        NULL,
        NULL
    ),
    (
        'P002',
        'Event Plan',
        '#FFFF00',
        NULL,
        'Plan for the upcoming event.',
        NOW (),
        'U002',
        NULL,
        NULL
    );

-- Insert data into 'feat_activity' table
INSERT INTO
    `feat_activity`
VALUES
    (
        'A001',
        'Meeting',
        NOW (),
        NULL,
        'Team meeting activity.',
        NOW (),
        'U001',
        NULL,
        NULL
    ),
    (
        'A002',
        'Workshop',
        NOW (),
        NULL,
        'Skill development workshop.',
        NOW (),
        'U002',
        NULL,
        NULL
    );

-- Insert data into 'feat_accounting' table
INSERT INTO
    `feat_accounting`
VALUES
    (
        'AC001',
        'U001',
        'Office Supplies',
        150.00,
        'USD',
        'U001,U002',
        'Purchased office supplies.',
        '2023-01-10',
        FALSE,
        NOW (),
        'U001'
    ),
    (
        'AC002',
        'U002',
        'Team Lunch',
        200.00,
        'USD',
        'U001,U002,U003',
        'Paid for team lunch.',
        '2023-01-15',
        TRUE,
        NOW (),
        'U002'
    );

-- Insert data into 'group_member' table (Users join Groups)
INSERT INTO
    `group_member`
VALUES
    ('G001', 'U001'),
    ('G001', 'U002'),
    ('G002', 'U002'),
    ('G002', 'U003');

<<<<<<< HEAD
-- Insert data into 'chat_in' table

INSERT INTO `chat_in` VALUES
('U001', 'C001', 'Welcome to Alpha General channel!', NOW()),
('U002', 'C001', 'Thank you, happy to be here.', NOW()),
('U003', 'C001', 'Looking forward to working with everyone.', NOW()),
('U004', 'C001', 'Hello all!', NOW()),
('U005', 'C001', 'Hi team!', NOW()),
('U002', 'C002', 'Project meeting at 2 PM.', NOW()),
('U003', 'C002', 'Got it, I will be there.', NOW()),
('U004', 'C002', 'I might be a bit late.', NOW()),
('U005', 'C002', 'No worries.', NOW()),
('U001', 'C002', 'See you all there.', NOW()),
('U003', 'C003', 'Event planning is underway.', NOW()),
('U004', 'C003', 'Do you need any help?', NOW()),
('U005', 'C003', 'I can assist.', NOW()),
('U001', 'C003', 'Let me know if resources are needed.', NOW()),
('U002', 'C003', 'Thanks everyone.', NOW()),
('U005', 'C004', 'Random thought: We should have a team outing.', NOW()),
('U001', 'C004', 'That sounds great!', NOW()),
('U002', 'C004', 'I agree!', NOW()),
('U003', 'C004', 'Count me in.', NOW()),
('U004', 'C004', 'Me too.', NOW()),
('U003', 'C005', 'Welcome to Beta General channel!', NOW()),
('U004', 'C005', 'Happy to join.', NOW()),
('U005', 'C005', 'Hello everyone!', NOW()),
('U006', 'C005', 'Greetings!', NOW()),
('U007', 'C005', 'Hi all!', NOW()),
('U006', 'C009', 'Welcome to Gamma General channel!', NOW()),
('U007', 'C009', 'Glad to be here.', NOW()),
('U008', 'C009', 'Hello everyone.', NOW()),
('U009', 'C009', 'Hi!', NOW()),
('U010', 'C009', 'Greetings!', NOW()),
('U007', 'C001', 'Hello Alpha Group!', NOW()),
('U009', 'C012', 'Random chat in Gamma Random channel.', NOW()),
('U010', 'C010', 'Working on Gamma Projects.', NOW());


=======
=======
>>>>>>> b5cd74d (Squashed commit of the following:)
-- fake data rule:
-- 1. 3 different groups
-- 2. 4 channels, 3 Identities and 3 Tags in each group
-- 3. every channel has 3 Activities, 10 Accounting records and 0 ~ 2 Plans
-- 4. 10 users can simultaneously join 3 different groups, and each user can be assigned multiple different Identities within each group.
-- 5. Each user within the group can access any Channels.
-- 6. Each user within the channel can send messages to other users within the channel
-- 7. Users can chat in multiple Channels simultaneously.
-- 8. Each user within the channel can create or update Plans and Activities
-- 9. Each user within the channel can create Accounting records
-- 10. Each user within the channel can be the payer in any Accounting records within the channel
-- 11. attendees_ids is formed as "U001,U002,U003....."
<<<<<<< HEAD
-- 12. Each user within the channel can be the attendee in any Accounting records within the channel
>>>>>>> b1cc8d9 (Squashed commit of the following:)
=======
-- Insert data into 'group_channel' table (Groups have Channels)
INSERT INTO
    `group_channel`
VALUES
    ('G001', 'C001'),
    ('G001', 'C002'),
    ('G002', 'C002');

-- Insert data into 'activity_hosted' table (Activities hosted in Channels)
INSERT INTO
    `activity_hosted`
VALUES
    ('C001', 'A001'),
    ('C002', 'A002');

-- Insert data into 'plan_hosted' table (Plans hosted in Channels)
INSERT INTO
    `plan_hosted`
VALUES
    ('P001', 'C001'),
    ('P002', 'C002');

-- Insert data into 'accounting_hosted' table (Accounting entries hosted in Channels)
INSERT INTO
    `accounting_hosted`
VALUES
    ('AC001', 'C001'),
    ('AC002', 'C002');

-- Insert data into 'assign_id' table (Groups assign Identities to Users)
INSERT INTO
    `assign_id`
VALUES
    ('G001', 'U001', 'R001'),
    ('G001', 'U002', 'R002'),
    ('G002', 'U002', 'R001'),
    ('G002', 'U003', 'R002');

-- Insert data into 'group_label' table (Associates Tags with Groups)
INSERT INTO
    `group_label`
VALUES
    ('G001', 'T001'),
    ('G002', 'T002');

-- Insert data into 'chat_in' table (Users chat in Channels)
INSERT INTO
    `chat_in`
VALUES
    ('U001', 'C001', 'Hello everyone!', NOW ()),
    ('U002', 'C001', 'Hi Alice!', NOW ()),
    (
        'U003',
        'C002',
        'Looking forward to the event.',
        NOW ()
    );
>>>>>>> 67f4359 (Squashed commit of the following:)
=======
-- 12. Each user within the channel can be the attendee in any Accounting records within the channel
>>>>>>> b5cd74d (Squashed commit of the following:)
