# Login: `/api/login`

## Login: `/api/login/login`

### Input:

| Field      | Description |
| ---------- | ----------- |
| `Email`    | mail 帳號   |
| `Password` | 密碼        |

### Output:

#### HTTP Codes:

| Code | Description                    |
| ---- | ------------------------------ |
| 200  | 成功登入                       |
| 400  | 請求錯誤（如參數無效）         |
| 401  | 驗證失敗，帳號或密碼錯誤       |
| 403  | 帳號被鎖定，登入失敗三次後鎖定 |

#### Data:

| Field       | Description |
| ----------- | ----------- |
| `JWTtoken`  |             |
| `UID`       |             |
| `userNames` |             |

---

## 第三方登入 (Google OAuth): `/api/login/google-login`

### Input:

| Field      | Description                  |
| ---------- | ---------------------------- |
| `id_token` | 從 Google OAuth 獲取的 token |

### Output:

#### HTTP Codes:

| Code | Description                    |
| ---- | ------------------------------ |
| 200  | 成功登入                       |
| 400  | 請求錯誤（如參數無效）         |
| 401  | 驗證失敗，帳號或密碼錯誤       |
| 403  | 帳號被鎖定，登入失敗三次後鎖定 |

#### Data:

| Field       | Description |
| ----------- | ----------- |
| `JWTtoken`  |             |
| `UID`       |             |
| `userNames` |             |

---

## Register: `/api/login/register`

### Input:

| Field      | Description |
| ---------- | ----------- |
| `Email`    | mail 帳號   |
| `Password` | 密碼        |
| `data`     |             |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `username`    |             |
| `attendtime`  |             |
| `updatetime`  |             |
| `gender`      |             |
| `birthday`    |             |
| `icon`        |             |
| `description` |             |
| `phone`       |             |

### Output:

#### HTTP Codes:

| Code | Description            |
| ---- | ---------------------- |
| 201  | 註冊成功               |
| 400  | 請求錯誤或 email 重複  |
| 409  | email 重複，帳號已存在 |

#### Data:

| Field      | Description |
| ---------- | ----------- |
| `JWTtoken` |             |
| `UID`      | 要回傳？    |

---

## Forget Password: `/api/login/forgetPswd`

### Input:

| Field   | Description |
| ------- | ----------- |
| `Email` | mail 帳號   |

### Output:

#### HTTP Codes:

| Code | Description                    |
| ---- | ------------------------------ |
| 200  | 成功送出重設密碼的郵件         |
| 400  | 請求錯誤（如參數無效）         |
| 401  | 驗證失敗，帳號或密碼錯誤       |
| 403  | 帳號被鎖定，登入失敗三次後鎖定 |

#### Data:

| Field      | Description       |
| ---------- | ----------------- |
| `mailsend` | 1 if mail is sent |

---

# Homepage: `/api/homepg`

## Create Group: `/api/homepg/createGroup`

### Input:

| Field       | Description         |
| ----------- | ------------------- |
| `groupName` |                     |
| `UIDs`      | Group members' UIDs |
| `data`      |                     |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `groupname`   |             |
| `createtime`  |             |
| `endtime`     |             |
| `createby`    | UID         |
| `updatetime`  |             |
| `updateby`    | UID         |
| `description` |             |
| `icon`        |             |
| `isprivate`   |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| 200  | Success     |
| 400  | Fail        |

#### Data:

| Field     | Description           |
| --------- | --------------------- |
| `groupID` | *What is the format?* |

---

## Template Converter: `/api/homepg/templateConverter`

### Input:

| Field          | Description |
| -------------- | ----------- |
| `templateFile` |             |

#### `templateFile`:

| Field     | Description           |
| --------- | --------------------- |
| `config`  | Template 的 config    |
| `feature` | Group 使用的 features |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| 200  | Success     |
| 400  | Fail        |

---

# User: `/api/user`

## Setting: `/api/user/setting`

### Input:

| Field      | Description |
| ---------- | ----------- |
| `UID`      |             |
| `userdata` |             |

#### `userdata`:

| Field         | Description |
| ------------- | ----------- |
| `username`    |             |
| `attendtime`  |             |
| `updatetime`  |             |
| `gender`      |             |
| `birthday`    |             |
| `icon`        |             |
| `description` |             |
| `phone`       |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

---

# Group: `/api/group`

## Assign Role: `/api/group/assign`

### Input:

| Field     | Description |
| --------- | ----------- |
| `groupID` |             |
| `UIDs`    |             |
| `data`    |             |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `color`       |             |
| `createtime`  |             |
| `updatetime`  |             |
| `updateby`    | UID         |
| `description` |             |
| `icon`        |             |
| `rolename`    |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

#### Data:

| Field | Description |
| ----- | ----------- |
| `RID` |             |

---

## Import Template: `/api/group/importTemplate`

### Input:

| Field      | Description |
| ---------- | ----------- |
| `template` |             |
| `groupID`  |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

---

## Invite: `/api/group/invite`

### Input:

| Field     | Description |
| --------- | ----------- |
| `groupID` |             |
| `UID`     |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

---

## Leave/Kick: `/api/group/leave`

### Input:

| Field     | Description |
| --------- | ----------- |
| `groupID` |             |
| `UID`     |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

---

# Channel: `/api/group/channel`

## Create Channel:

### Input:

| Field     | Description |
| --------- | ----------- |
| `groupID` |             |
| `data`    |             |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `CID`         |             |
| `channelname` |             |
| `createtime`  |             |
| `updatetime`  |             |
| `updateby`    |             |
| `message`     |             |
| `description` |             |
| `icon`        |             |
| `Activitys`   |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| 200  | Success     |
| 400  | Fail        |

#### Data:

| Field | Description |
| ----- | ----------- |
| `CID` |             |

---

## Notice: `/api/channel/notice`

### Input:

| Field       | Description |
| ----------- | ----------- |
| `inSource`  |             |
| `outSource` |             |
| `message`   |             |
| `sender`    |             |
| `CID`       |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

---

# Feature: `/api/feature`

## Create Activity: `/api/feature/activity/create`

### Input:

| Field       | Description |
| ----------- | ----------- |
| `channelID` |             |
| `data`      |             |

#### Data:

| Field          | Description |
| -------------- | ----------- |
| `createtime`   |             |
| `updatetime`   |             |
| `description`  |             |
| `endtime`      |             |
| `starttime`    |             |
| `activityname` |             |
| `AID`          |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

---

# Accounting (分帳)

## Create Accounting: `/api/feature/activity/create`

### Input:

| Field  | Description |
| ------ | ----------- |
| `CID`  |             |
| `data` |             |

#### Data:

| Field           | Description |
| --------------- | ----------- |
| `unit`          |             |
| `title`         |             |
| `payer`         |             |
| `createby`      |             |
| `createtime`    |             |
| `dollar`        |             |
| `Attendees' ID` |             |
| `description`   |             |
| `eventtime`     |             |
| `ACID`          |             |
| `issplit`       |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

---

# Plan

## Create Plan: `/api/feature/plan/create`

### Input:

| Field     | Description |
| --------- | ----------- |
| `channel` |             |
| `data`    |             |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `PID`         |             |
| `planname`    |             |
| `color`       |             |
| `createtime`  |             |
| `createby`    |             |
| `updatetime`  |             |
| `updateby`    |             |
| `description` |             |
| `icon`        |             |

---

# Update: `/api/update`

## Update Group: `/api/update/group`

### Input:

| Field       | Description         |
| ----------- | ------------------- |
| `groupName` |                     |
| `UIDs`      | Group members' UIDs |
| `data`      |                     |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `groupname`   |             |
| `createtime`  |             |
| `endtime`     |             |
| `createby`    | UID         |
| `updatetime`  |             |
| `updateby`    | UID         |
| `description` |             |
| `icon`        |             |
| `isprivate`   |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| 200  | Success     |
| 400  | Fail        |

#### Data:

| Field     | Description           |
| --------- | --------------------- |
| `groupID` | *What is the format?* |

---

## Update Role: `/api/update/role`

### Input:

| Field     | Description |
| --------- | ----------- |
| `groupID` |             |
| `UIDs`    |             |
| `data`    |             |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `color`       |             |
| `createtime`  |             |
| `updatetime`  |             |
| `updateby`    | UID         |
| `description` |             |
| `icon`        |             |
| `rolename`    |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |

#### Data:

| Field | Description |
| ----- | ----------- |
| `RID` |             |

---

## Update Channel: `/api/update/channel`

### Input:

| Field     | Description |
| --------- | ----------- |
| `groupID` |             |
| `data`    |             |

#### Data:

| Field         | Description |
| ------------- | ----------- |
| `CID`         |             |
| `channelname` |             |
| `createtime`  |             |
| `updatetime`  |             |
| `updateby`    |             |
| `message`     |             |
| `description` |             |
| `icon`        |             |
| `Activitys`   |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| 200  | Success     |
| 400  | Fail        |

#### Data:

| Field | Description |
| ----- | ----------- |
| `CID` |             |

---

## Update Activity: `/api/update/activity`

### Input:

| Field       | Description |
| ----------- | ----------- |
| `channelID` |             |
| `data`      |             |

#### Data:

| Field          | Description |
| -------------- | ----------- |
| `createtime`   |             |
| `updatetime`   |             |
| `description`  |             |
| `endtime`      |             |
| `starttime`    |             |
| `activityname` |             |
| `AID`          |             |

### Output:

#### HTTP Codes:

| Code | Description |
| ---- | ----------- |
| ...  | ...         |
