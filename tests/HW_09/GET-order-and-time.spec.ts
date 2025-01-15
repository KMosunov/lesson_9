import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Successful request for time with correct id. Status 200', async ({ request }) => {
  const requestHeaders = {
    'x-application-name': 'tld',
    'x-session-id': 'jwtEysp'
  }
  // Test data: 1,2,5,9,10
  const requestParameters = {
    'id': 2
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/time/2', {
    headers:requestHeaders,
    params: requestParameters,
  })
  const responseBody = await response.json();

  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('currentDateTime: ', responseBody.currentDateTime)
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody.currentDateTime).not.toBe(null)
})

test('Unsuccessful with incorrect id. Status 400', async ({ request }) => {
  const requestHeaders = {
    'x-application-name': 'tld',
    'x-session-id': 'jwtEysp'
  }
  // Test data: 0, 11
  const requestParameters = {
    'id': 11
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/time/11', {
    headers:requestHeaders,
    params: requestParameters,
  })
  const responseBody = await response.json();

  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('currentDateTime: ', responseBody.currentDateTime)
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(responseBody.currentDateTime).toBe(undefined)
})