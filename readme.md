## HW_09
## Checklist endpoint GET /test-orders/{id}

| # | Name of test                                                 | Test data      | Status |
|---|--------------------------------------------------------------|----------------|--------|
| 1 | Successful getting order details with correct id. Status 200 | 1, 2, 5, 9, 10 | Passed |
| 2 | Unsuccessful with incorrect id. Status 400                   | 0, 11          | Passed |
| 3 | Unsuccessful with empty id. Status 500                       |                | Passed |
| 4 | Unsuccessful with id string format. Status 400               |                | Passed |

## Checklist endpoint PUT /test-orders/{id}

| #  | Name of test                                                  | Test data      | Status |
|----|---------------------------------------------------------------|----------------|--------|
| 1  | Successful changing order details with correct id. Status 200 | 1, 2, 5, 9, 10 | Passed |
| 2  | Successful with correct id and status ACCEPTED. Status 200    |                | Passed |
| 3  | Successful with correct id and status INPROGRESS. Status 200  |                | Passed |
| 4  | Successful with correct id and status DELIVERED. Status 200   |                | Passed |
| 5  | Unsuccessful with incorrect customerName. Status 400          |                | Failed |
| 6  | Unsuccessful with empty customerName. Status 400              |                | Failed |
| 7  | Unsuccessful with incorrect customerPhone. Status 400         |                | Failed |
| 8  | Unsuccessful with empty customerPhone. Status 400             |                | Failed |
| 9  | Unsuccessful with empty comment. Status 400                   |                | Failed |
| 10 | Unsuccessful with incorrect id. Status 400                    | 0, 11          | Passed |
| 11 | Unsuccessful with empty id. Status 405 Method Nit Allowed     |                | Passed |

## Checklist endpoint DELETE /test-orders/{id}

| # | Name of test                                          | Test data      | Status | Comment |
|---|-------------------------------------------------------|----------------|--------|---------|
| 1 | Successful deleting order with correct id. Status 204 | 1, 2, 5, 9, 10 |        | Passed  |
| 2 | Unsuccessful with incorrect id. Status 400            | 0, 11          |        | Passed  |
| 3 | Unsuccessful with empty id. Status 400                |                |        | Failed  |

## Checklist endpoint GET /test-orders

| # | Name of test                                                             | Test data      | Status |
|---|--------------------------------------------------------------------------|----------------|--------|
| 1 | Successful authentication with correct username and password. Status 200 | A, qwe         | Passed |
| 2 | Unsuccessful with incorrect username and correct password. Status 400    | 123 (int), qwe | Failed |
| 3 | Unsuccessful with correct username and incorrect password. Status 400    | A, 123 (int)   | Failed |
| 4 | Unsuccessful with empty username and correct password. Status 500        | , qwe          | Passed |
| 5 | Unsuccessful with correct username and empty password. Status 500        | A,             | Passed |

## Checklist endpoint GET /test-orders/time/{id}

| # | Name of test                                            | Test data      | Status |
|---|---------------------------------------------------------|----------------|--------|
| 1 | Successful request for time with correct id. Status 200 | 1, 2, 5, 9, 10 | Passed |
| 2 | Unsuccessful with incorrect id. Status 400              | 0, 11          | Passed |

## Checklist endpoint GET /test-orders/payment/{id}

| # | Name of test                                                              | Test data      | Status |
|---|---------------------------------------------------------------------------|----------------|--------|
| 1 | Successful request for getting payment status with correct id. Status 200 | 1, 2, 5, 9, 10 | Passed |
| 2 | Unsuccessful with incorrect id. Status 400                                | 0, 11          | Passed |

## Checklist endpoint GET /test-orders/get_orders

| # | Name of test                                      | Test data | Status |
|---|---------------------------------------------------|-----------|--------|
| 1 | Successful getting all orders details. Status 200 |           | Passed |

## HW_10
## Checklist endpoint POST /api/loan-calc/decision

| #  | Name of test                                                                       | Test data                                                             | Status |
|----|------------------------------------------------------------------------------------|-----------------------------------------------------------------------|--------|
| 1  | Successful request with corr data. Status 200                                      | income: 1, 100; age: 17, 50; debt: 1, 100; loanPeriod: 1, 10          |        |
| 2  | Unuccessful request with incorr income. Status 400                                 | income: 0; age: 17, 50; debt: 1, 100; loanPeriod: 1, 10               |        |
| 3  | Unuccessful request with incorr debt. Status 400                                   | income: 1, 100; age: 17, 50; debt: -100; loanPeriod: 1, 10            |        |
| 4  | Unuccessful request with incorr age. Status 400                                    | income: 1, 100; age: 0, 1, 8, 15, 16; debt: 1, 100; loanPeriod: 1, 10 | Failed |
| 5  | Unuccessful request with negative loanAmount. Status 400                           |                                                                       |        |
| 6  | Unuccessful request with incorr loanPeriod. Status 400                             | income: 1, 100; age: 17, 50; debt: 1, 100; loanPeriod: 0, -1          |        |
| 7  | Negative response with income less than loanAmount. Status 200                     |                                                                       |        |
| 8  | Negative response with equal income and loanAmount and long loanPeriod. Status 200 |                                                                       |        |
| 9  | Positive response with income greater than loanPeriod. Status 200                  |                                                                       |        |
| 10 | Positive response with High Risk riskScore, periods 3,6. Status 200                |                                                                       |        |
| 11 | Positive response with Medium Risk riskScore, periods 6, 9, 12. Status 200         |                                                                       |        |
| 12 | Positive response with Low Risk riskScore, periods 12, 18, 24, 30, 36. Status 200  |                                                                       |        |
| 13 | Positive response with Unknown Risk riskScore. Status 200                          |                                                                       |        |
| 14 | Unuccessful request with empty income. Status 400                                  |                                                                       |        |
| 15 | Unuccessful request with empty debt. Status 400                                    |                                                                       | Failed |
| 16 | Unuccessful request with empty age. Status 400                                     |                                                                       |        |
| 17 | Unuccessful request with empty employed. Status 400                                |                                                                       | Failed |
| 18 | Unuccessful request with empty empty loanAmount. Status 400                        |                                                                       |        |
| 19 | Unuccessful request with empty loanPeriod. Status 400                              |                                                                       |        |
