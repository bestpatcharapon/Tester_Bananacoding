# Tester_Bananacoding

## Test Execution Report

**Summary**
| Status | Count |
| :--- | :--- |
| **PASSED** | 19 |
| **FAILED** | 0 |
| **Unable for Test** | 1 |

**Test Scenarios**

| TS ID      | Test Scenario | TC ID      | Test Case Description          | Test Step                                                       | Expected Result                                                                                                                                                                                                                          | Status              | Date       | Notes                        |
| :--------- | :------------ | :--------- | :----------------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ | :--------- | :--------------------------- |
| **TS_001** | User Login    | **TC_001** | Check website display          | 1. Open website "https://new-bananatesting.onbananacoding.com/" | 1. System displays:<br>1.1 Logo Bt<br>1.2 Title "Hello, Welcome back!"<br>1.3 Email input<br>1.4 Password input<br>1.5 "Remember me" checkbox<br>1.6 "Forgot password?" link<br>1.7 Sign in button<br>1.8 Sign in with office 365 button | **PASSED**          | 20/11/2025 |                              |
|            |               | **TC_002** | Login success (Sign in button) | Enter correct Email/Pass and click Sign in                      | 1. System verifies data successfully<br>2. Redirect to Dashboard/Homepage                                                                                                                                                                | **Unable for Test** | 22/11/2025 | Server issue prevented login |
|            |               | **TC_003** | Login success (Office 365)     | Click Sign in with office 365                                   | 1. Redirect to Microsoft Login<br>2. On success, redirect to Dashboard                                                                                                                                                                   | **PASSED**          | 22/11/2025 |                              |
|            |               | **TC_004** | Login fail (Wrong Email)       | Enter wrong Email, any Password, click Sign in                  | 1. Alert "Email not found"<br>2. Stay on Login page                                                                                                                                                                                      | **PASSED**          | 22/11/2025 |                              |
|            |               | **TC_005** | Login fail (Wrong Password)    | Enter correct Email, wrong Password, click Sign in              | 1. Alert "Incorrect password"<br>2. Stay on Login page                                                                                                                                                                                   | **PASSED**          | 22/11/2025 |                              |
|            |               | **TC_006** | Login fail (Empty)             | Leave empty and click Sign in                                   | 1. Show Required Field Validation under Email and Password                                                                                                                                                                               | **PASSED**          | 22/11/2025 |                              |
