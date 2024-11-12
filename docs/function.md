# Function List

## Login
- [Readme](../src/backend/router/auth/Readme.md)

| Function         | Input                     | Output                            | Description                | Note                           |
| ---------------- | ------------------------- | --------------------------------- | -------------------------- | ------------------------------ |
| `login`          | email, password           | httpCode, JWTtoken, UID, userName | 200: success, 400: failure | Locked after 3 failed attempts |
| `register`       | email, password, userName | httpCode                          | 200: success, 400: failure | Check if email is duplicated   |
| `forgetPassword` | email                     | httpCode                          | 200: success, 400: failure | Sends password reset email     |

## Homepage 
- [Readme](../src/backend/router/homepage/Readme.md)

| Function          | Input                                | Output    | Description                      | Note                                       | 
| ----------------- | ------------------------------------ | --------- | -------------------------------- | ------------------------------------------ |
| `createGroup`     | groupName, [UID], endTime?, ispublic | httpCode  | 200: group created, 400: failure | Create a new group                         |
| `*groupSearch`    | tag?, groupName?                     | groupList | 200: group list returned         | Supports keyword search                    |
| `*recommendation` | userID                               | groupList | 200: recommended group list      | Recommend groups based on user preferences |

## User 
- [Readme](../src/backend/router/user/Readme.md)

| Function  | Input          | Output                   | Description                          | Note                 |
| --------- | -------------- | ------------------------ | ------------------------------------ | -------------------- |
| `setting` | UID, password, | httpCode, setting config | 200: update successful, 400: failure | Update user settings |
| `profile` | UID, userName, | httpCode, profile config | 200: update successful, 400: failure | Update user settings |

## Group 
- [Readme](../src/backend/router/group/Readme.md)


| Function         | Input                                      | Output                 | Description                          | Note                           |
| ---------------- | ------------------------------------------ | ---------------------- | ------------------------------------ | ------------------------------ |
| `role`           | groupID, [ UserId ], roleName              | httpCode               | 200: success, 400: failure           | Assign roles to group members  |
| `notice` 前端    | inSource (enum), outSource (enum), message | httpCode               | 200: message sent, 400: failure      | Publish group notice           |
| `notice` 後端    | inSource (enum), outSource (enum), message | httpCode               | 200: message sent, 400: failure      | Publish group notice           |
| `*settings`      | groupID, [ settings ]                      | httpCode               | 200: update successful, 400: failure | Update group settings          |
| `endTime`        | groupID, endTime                           | httpCode               | 200: update successful, 400: failure | Set group end time             |
| `importTemplate` | groupID, templateObject                    | httpCode               | 200: success, 400: failure           | Import group settings template |
| `exportTemplate` | groupID                                    | httpcode, templateFile | 200: template exported               | Export group settings template |
| `invite` v       | groupID, userID                            | httpCode               | 200: invite sent, 400: failure       | Invite user to group           |
| `leave`          | groupID, userID                            | httpCode               | 200: leave successful, 400: failure  | User leaves group              |

## Channel 
- [Readme](../src/backend/router/channel/Readme.md)


| Function          | Input                               | Output                     | Description                     | Note                    |
| ----------------- | ----------------------------------- | -------------------------- | ------------------------------- | ----------------------- |
| `textMessaging`   | channelID (包含group 資訊), message | display message on channel | 200: message sent, 400: failure | Send message to channel |
| `exportText` 前端 | channelID                           | markdown file              | 200: text exported              | Export channel messages |

## Module Feature 
- [Readme](../src/backend/router/modulefeatures/Readme.md)


| Function                   | Input                                       | Output        | Description                          | Note                                     |
| -------------------------- | ------------------------------------------- | ------------- | ------------------------------------ | ---------------------------------------- |
| `Activity.createActivity`  | channelID, activityName, description, time  | httpCode      | 200: success, 400: failure           | Create a new activity module             |
| `Activity.activitySetting` | activityID, activityName, time, description | httpCode      | 200: update successful, 400: failure | Update activity module settings          |
| `Vote.createVote`          | [ option ]                                  | selected item | 200: success, 400: failure           | Create a voting activity                 |
| `RandomPick`               | [ items ]                                   | selected item | 200: success, 400: failure           | Randomly pick an item from the list      |
| `Accounting` 記帳          |                                             | httpCode      | 200: success, 400: failure           | Add transaction in the accounting module |
| `BillSplit`                |                                             | httpCode      | 200: success, 400: failure           | Split bill in the BillSplit module       |