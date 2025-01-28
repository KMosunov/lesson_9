import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanDTO } from '../DTO/LoanDTO'

test('Successful request with corr data. Status 200. Status 200', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_1(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_1())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBeDefined()
  expect.soft(responseBody.riskScore).not.toBeNull()
})

test('Unuccessful request with incorr income. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_2(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_2())
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with incorr debt. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_3(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_3())
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with incorr age. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_4(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_4())
  console.log('response status:', response.status())
  //BUG вместо 400 выдает 200
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with negative loanAmount. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_5(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_5())
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with incorr loanPeriod. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_6(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_6())
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Negative response with income less than loanAmount. Status 200', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_7(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_7())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskDecision).toBe('negative')
  expect.soft(responseBody.riskScore).not.toBeNull()
})

test('Negative response with equal income and loanAmount and long loanPeriod. Status 200', async ({
  request,
}) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_8(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_8())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskDecision).toBe('negative')
  expect.soft(responseBody.riskScore).not.toBeNull()
})

test('Positive response with income greater than loanAmount. Status 200', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_9(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_9())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskScore).not.toBeNull()
  expect.soft(responseBody.riskLevel).toBeDefined()
})

test('Positive response with High Risk, periods 3,6. Status 200', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_10(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_10())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([3, 6])
})

test('Positive response with Medium Risk, periods 6, 9, 12. Status 200', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_11(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_11())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
})

test('Positive response with Low Risk, periods 12, 18, 24, 30, 36. Status 200', async ({
  request,
}) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_12(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_12())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskPeriods).toEqual([12, 18, 24, 30, 36])
})

test('Positive response with Unknown Risk. Status 200', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_13(),
    },
  )
  const responseBody = LoanDTO.serializeResponse(await response.json())

  console.log(LoanDTO.generateRandomLoanDto_13())
  console.log('response status:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('Unknown Risk')
})

test('Unuccessful request with empty income. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_14(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_14())
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with empty debt. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_15(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_15())
  console.log('response status:', response.status())
  //BUG выдает 200 вместо 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with empty age. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_16(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_16())
  console.log('response status:', response.status())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with empty employed. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_17(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_17())
  console.log('response status:', response.status())
  //BUG выдает 200 вместо 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with empty empty loanAmount. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_18(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_18())
  console.log('response status:', response.status())
  //BUG выдает 200 вместо 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unuccessful request with empty loanPeriod. Status 400', async ({ request }) => {
  const response = await request.post(
    `https://backend.tallinn-learning.ee/api/loan-calc/decision`,
    {
      data: LoanDTO.generateRandomLoanDto_19(),
    },
  )
  console.log(LoanDTO.generateRandomLoanDto_19())
  console.log('response status:', response.status())
  //BUG выдает 200 вместо 400
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
