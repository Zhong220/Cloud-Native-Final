USE `cns_db`;

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

-- Insert data into 'user' table


INSERT INTO `user` (`username`, `email`, `password`) VALUES
('user1', 'alice@example.com', '0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e'), -- password1
('user2', 'bob@example.com', '6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4'), -- password2
('user3', 'charlie@example.com', '5906ac361a137e2d286465cd6588ebb5ac3f5ae955001100bc41577c3d751764'); -- password3

INSERT INTO `chatroom` (`name`, `description`) VALUES
('Weekend Getaway', 'Planning a weekend trip with friends'),
('Office Expenses', 'Shared expenses for office supplies');

INSERT INTO `accounting` (`title`, `super_cid`, `payer`, `attendees_ids`, `price`, `issplited`) VALUES
('Dinner at Restaurant', 1, 1, '2,3', 1200.50, FALSE), -- Alice 付錢，Bob 和 Charlie 分帳
('Stationery Purchase', 2, 2, '1,3', 300.00, FALSE); -- Bob 付錢，Alice 和 Charlie 分帳