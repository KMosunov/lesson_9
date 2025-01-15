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