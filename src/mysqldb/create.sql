-- create.sql
-- Drop tables if they exist (in correct order to avoid foreign key constraints issues)
DROP TABLE IF EXISTS `chat_in`;

DROP TABLE IF EXISTS `group_label`;

DROP TABLE IF EXISTS `assign_id`;

DROP TABLE IF EXISTS `accounting_hosted`;

DROP TABLE IF EXISTS `plan_hosted`;

DROP TABLE IF EXISTS `activity_hosted`;

DROP TABLE IF EXISTS `group_channel`;

DROP TABLE IF EXISTS `group_member`;

DROP TABLE IF EXISTS `feat_accounting`;

DROP TABLE IF EXISTS `feat_activity`;

DROP TABLE IF EXISTS `feat_plan`;

DROP TABLE IF EXISTS `identity`;

DROP TABLE IF EXISTS `tag`;

DROP TABLE IF EXISTS `channel`;

DROP TABLE IF EXISTS `group`;

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

-- Create 'group' table
CREATE TABLE
    `group` (
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
        `icon` BLOB DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`cid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'tag' table
CREATE TABLE
    `tag` (
        `tid` VARCHAR(10) NOT NULL COMMENT 'Tag ID',
        `tag_name` VARCHAR(255) NOT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`tid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'identity' table
CREATE TABLE
    `identity` (
        `rid` VARCHAR(10) NOT NULL COMMENT 'Role ID',
        `role_name` VARCHAR(255) NOT NULL,
        `icon` BLOB NOT NULL,
        `color` CHAR(7) DEFAULT NULL COMMENT '#HEX',
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`rid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_plan' table
CREATE TABLE
    `feat_plan` (
        `pid` VARCHAR(10) NOT NULL COMMENT 'Plan ID',
        `plan_name` VARCHAR(255) NOT NULL,
        `color` CHAR(7) DEFAULT NULL COMMENT '#HEX',
        `icon` BLOB NOT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`pid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_activity' table
CREATE TABLE
    `feat_activity` (
        `aid` VARCHAR(10) NOT NULL COMMENT 'Activity ID',
        `activity_name` VARCHAR(255) NOT NULL,
        `start_time` TIMESTAMP NOT NULL,
        `end_time` TIMESTAMP DEFAULT NULL,
        `description` TEXT DEFAULT NULL,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `updated_by` VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (`aid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`updated_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'feat_accounting' table
CREATE TABLE
    `feat_accounting` (
        `acid` VARCHAR(10) NOT NULL COMMENT 'Accounting ID',
        `payer` VARCHAR(10) NOT NULL,
        `title` VARCHAR(255) NOT NULL,
        `amount` DECIMAL(10, 2) NOT NULL,
        `unit` VARCHAR(3) DEFAULT 'NTD',
        `attendees_ids` TEXT NOT NULL COMMENT 'Comma-separated attendee IDs',
        `description` TEXT DEFAULT NULL,
        `event_time` DATE NOT NULL,
        `is_split` BOOLEAN DEFAULT FALSE,
        `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `created_by` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`acid`),
        FOREIGN KEY (`payer`) REFERENCES `user` (`uid`),
        FOREIGN KEY (`created_by`) REFERENCES `user` (`uid`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Create 'group_member' table (Users join Groups)
CREATE TABLE
    `group_member` (
        `gid` VARCHAR(10) NOT NULL,
        `uid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`gid`, `uid`),
        FOREIGN KEY (`gid`) REFERENCES `group` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Users join Groups';

-- Create 'group_channel' table (Groups have Channels)
CREATE TABLE
    `group_channel` (
        `gid` VARCHAR(10) NOT NULL,
        `cid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`gid`, `cid`),
        FOREIGN KEY (`gid`) REFERENCES `group` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`cid`) REFERENCES `channel` (`cid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Groups have Channels';

-- Create 'activity_hosted' table (Activities hosted in Channels)
CREATE TABLE
    `activity_hosted` (
        `cid` VARCHAR(10) NOT NULL,
        `aid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`cid`, `aid`),
        FOREIGN KEY (`cid`) REFERENCES `channel` (`cid`) ON DELETE CASCADE,
        FOREIGN KEY (`aid`) REFERENCES `feat_activity` (`aid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Activities hosted in Channels';

-- Create 'plan_hosted' table (Plans hosted in Channels)
CREATE TABLE
    `plan_hosted` (
        `pid` VARCHAR(10) NOT NULL,
        `cid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`pid`, `cid`),
        FOREIGN KEY (`pid`) REFERENCES `feat_plan` (`pid`) ON DELETE CASCADE,
        FOREIGN KEY (`cid`) REFERENCES `channel` (`cid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Plans hosted in Channels';

-- Create 'accounting_hosted' table (Accounting entries hosted in Channels)
CREATE TABLE
    `accounting_hosted` (
        `acid` VARCHAR(10) NOT NULL,
        `cid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`acid`, `cid`),
        FOREIGN KEY (`acid`) REFERENCES `feat_accounting` (`acid`) ON DELETE CASCADE,
        FOREIGN KEY (`cid`) REFERENCES `channel` (`cid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Accounting entries hosted in Channels';

-- Create 'assign_id' table (Groups assign Identities to Users)
CREATE TABLE
    `assign_id` (
        `gid` VARCHAR(10) NOT NULL,
        `uid` VARCHAR(10) NOT NULL,
        `rid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`gid`, `uid`, `rid`),
        FOREIGN KEY (`gid`) REFERENCES `group` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
        FOREIGN KEY (`rid`) REFERENCES `identity` (`rid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Groups assign Identities to Users';

-- Create 'group_label' table (Associates Tags with Groups)
CREATE TABLE
    `group_label` (
        `gid` VARCHAR(10) NOT NULL,
        `tid` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`gid`, `tid`),
        FOREIGN KEY (`gid`) REFERENCES `group` (`gid`) ON DELETE CASCADE,
        FOREIGN KEY (`tid`) REFERENCES `tag` (`tid`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = 'Associates Tags with Groups';

-- Create 'chat_in' table (Users chat in Channels)
CREATE TABLE
    `chat_in` (
        `uid` VARCHAR(10) NOT NULL,
        `cid` VARCHAR(10) NOT NULL,
        `message` TEXT NOT NULL,
        `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`uid`, `cid`, `timestamp`),
        FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE,
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