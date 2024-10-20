# Function List
### Login

| Function         | Input                    | Output    | Description                                | Router | Note                           |
| ---------------- | ------------------------ | --------- | ------------------------------------------ | ------ | ------------------------------ |
| `login`          | account, password        | http code | 200: success, 400: failure                 |        | Locked after 3 failed attempts |
| `register`       | account, password, email | http code | 201: registration successful, 400: failure |        | Check if email is duplicated   |
| `forgetPassword` | email                    | http code | 200: success, 400: failure                 |        | Sends password reset email     |

### Homepage

| Function         | Input               | Output    | Description                      | Router | Note                                       |
| ---------------- | ------------------- | --------- | -------------------------------- | ------ | ------------------------------------------ |
| `createGroup`    | groupName, userID   | http code | 201: group created, 400: failure |        | Create a new group                         |
| `importTemplate` | templateID, groupID | http code | 200: success, 400: failure       |        | Import group settings template             |
| `groupSearch`    | keyword             | groupList | 200: group list returned         |        | Supports keyword search                    |
| `recommendation` | userID              | groupList | 200: recommended group list      |        | Recommend groups based on user preferences |

### User

| Function  | Input            | Output    | Description                          | Router | Note                 |
| --------- | ---------------- | --------- | ------------------------------------ | ------ | -------------------- |
| `setting` | userID, settings | http code | 200: update successful, 400: failure |        | Update user settings |

### Group

| Function         | Input                 | Output    | Description                          | Router | Note                           |
| ---------------- | --------------------- | --------- | ------------------------------------ | ------ | ------------------------------ |
| `role`           | groupID, userID, role | http code | 200: success, 400: failure           |        | Assign roles to group members  |
| `notice`         | groupID, message      | http code | 200: message sent, 400: failure      |        | Publish group notice           |
| `settings`       | groupID, settings     | http code | 200: update successful, 400: failure |        | Update group settings          |
| `endTime`        | groupID, endTime      | http code | 200: update successful, 400: failure |        | Set group end time             |
| `importTemplate` | groupID, templateID   | http code | 200: success, 400: failure           |        | Import group settings template |
| `exportTemplate` | groupID               | file      | 200: template exported               |        | Export group settings template |
| `invite`         | groupID, userID       | http code | 200: invite sent, 400: failure       |        | Invite user to group           |
| `leave`          | groupID, userID       | http code | 200: leave successful, 400: failure  |        | User leaves group              |

### Channel

| Function        | Input              | Output    | Description                     | Router | Note                             |
| --------------- | ------------------ | --------- | ------------------------------- | ------ | -------------------------------- |
| `textMessaging` | channelID, message | http code | 200: message sent, 400: failure |        | Send message to channel          |
| `exportText`    | channelID          | file      | 200: text exported              |        | Export channel messages          |
| `moduleFeature` | channelID, module  | http code | 200: success, 400: failure      |        | Enable or manage channel modules |

### Module Feature

| Function                    | Input                               | Output    | Description                          | Router | Note                                                                                      |
| --------------------------- | ----------------------------------- | --------- | ------------------------------------ | ------ | ----------------------------------------------------------------------------------------- |
| `moduleFeature`             | channelID, moduleType, action, data | http code | 200: success, 400: failure           |        | Handles various module features (e.g., Activity, Accounting, BillSplit, Vote, RandomPick) |
| `Activity.createActivity`   | channelID, activityName, details    | http code | 200: success, 400: failure           |        | Create a new activity module                                                              |
| `Activity.activitySetting`  | activityID, settings                | http code | 200: update successful, 400: failure |        | Update activity module settings                                                           |
| `Accounting.addTransaction` | transaction details                 | http code | 200: success, 400: failure           |        | Add transaction in the accounting module                                                  |
| `BillSplit.splitBill`       | bill details                        | http code | 200: success, 400: failure           |        | Split bill in the BillSplit module                                                        |
| `Vote.createVote`           | options, settings                   | http code | 200: success, 400: failure           |        | Create a voting activity                                                                  |
| `RandomPick.randomPick`     | list of items                       | selected  | 200: success, 400: failure           |        | Randomly pick an item from the list                                                       |

