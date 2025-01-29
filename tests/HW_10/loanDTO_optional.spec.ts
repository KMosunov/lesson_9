import { APIRequestContext, APIResponse, expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanDTO } from '../DTO/LoanDTO'

// Helper functions
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function postLoanDecision(request: APIRequestContext, loanData: LoanDTO) {
  return await request.post(`https://backend.tallinn-learning.ee/api/loan-calc/decision`, {
    data: loanData,
  })
}

function logResponse(requestData: LoanDTO, response: APIResponse, responseBody = null): void {
  console.log('Request data:', requestData)
  console.log('Response status:', response.status())
  if (responseBody) console.log('Response body:', responseBody)
}

function expectStatus(response: APIResponse, expectedStatus: unknown): void {
  expect(response.status()).toBe(expectedStatus)
}

// Tests
test('Successful request with correct data. Status 200', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_1()
  const response = await postLoanDecision(request, requestData)
  const responseBody = LoanDTO.serializeResponse(await response.json())

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBeDefined()
  expect.soft(responseBody.riskScore).not.toBeNull()
})

test('Unsuccessful request with incorrect income. Status 400', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_2()
  const response = await postLoanDecision(request, requestData)

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.BAD_REQUEST)
})

test('Unsuccessful request with incorrect debt. Status 400', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_3()
  const response = await postLoanDecision(request, requestData)

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.BAD_REQUEST)
})

test('Unsuccessful request with incorrect age. Status 400', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_4()
  const response = await postLoanDecision(request, requestData)

  logResponse(requestData, response)
  // BUG: Expected 400 but received 200
  expectStatus(response, StatusCodes.BAD_REQUEST)
})

test('Unsuccessful request with negative loanAmount. Status 400', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_5()
  const response = await postLoanDecision(request, requestData)

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.BAD_REQUEST)
})

test('Negative response with income less than loanAmount. Status 200', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_7()
  const response = await postLoanDecision(request, requestData)
  const responseBody = LoanDTO.serializeResponse(await response.json())

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.OK)
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskDecision).toBe('negative')
  expect.soft(responseBody.riskScore).not.toBeNull()
})

test('Positive response with income greater than loanAmount. Status 200', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_9()
  const response = await postLoanDecision(request, requestData)
  const responseBody = LoanDTO.serializeResponse(await response.json())

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskScore).not.toBeNull()
  expect.soft(responseBody.riskLevel).toBeDefined()
})

test('Positive response with High Risk, periods 3,6. Status 200', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_10()
  const response = await postLoanDecision(request, requestData)
  const responseBody = LoanDTO.serializeResponse(await response.json())

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.OK)
  expect.soft(responseBody.riskDecision).toBe('positive')
  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([3, 6])
})

test('Unsuccessful request with empty income. Status 400', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_14()
  const response = await postLoanDecision(request, requestData)

  logResponse(requestData, response)
  expectStatus(response, StatusCodes.BAD_REQUEST)
})

test('Unsuccessful request with empty loanAmount. Status 400', async ({ request }) => {
  const requestData = LoanDTO.generateRandomLoanDto_18()
  const response = await postLoanDecision(request, requestData)

  logResponse(requestData, response)
  // BUG: Expected 400 but received 200
  expectStatus(response, StatusCodes.BAD_REQUEST)
})
