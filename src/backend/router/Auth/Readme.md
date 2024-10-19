# Auth

### Login
<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(login by given UID and password)</code></summary>

##### Header
| key   | value   | desciption   |
| ----- | ------- | ------------ |
| ----- | ------- | ------------ |

##### Path Parameters
| key      | required | datatype | desciption            |
| -------- | -------- | -------- | --------------------- |
| UID      | true     | string   | ID for the user       |
| password | true     | string   | Password for the user |

##### Responses
| http code | content-type     | response                                                |
| --------- | ---------------- | ------------------------------------------------------- |
| 200       | application/json | `{"message": "Login successfully!"}`                    |
| 400       | application/json | `{"message": "Bad request - Invalid UID or password."}` |
| 500       | application/json | `{"message": "Server error."}`                          |

</details>

### Revise Password

<details>
<summary><code>REVISE</code> <code><b>/</b></code> <code>(revise user's password)</code></summary>

<br />New pwd should be different from the old one.

#### Header
| key   | value   | desciption   |
| ----- | ------- | ------------ |
| ----- | ------- | ------------ |

#### Path Parameters
| key          | required | datatype | desciption                              |
| ------------ | -------- | -------- | --------------------------------------- |
| UID          | true     | string   | ID for the user                         |
| old password | true     | string   | Old password for the user               |
| new password | true     | string   | New Password for the user               |
| new password | true     | string   | New Password for the user (enter again) |

#### Responses
| http code | content-type     | response                                         |
| --------- | ---------------- | ------------------------------------------------ |
| 200       | application/json | `{"message": "Revise password successfully!"}`   |
| 400       | application/json | `{"message": "Bad request - Invalid password."}` |
| 500       | application/json | `{"message": "Server error."}`                   |

</details>