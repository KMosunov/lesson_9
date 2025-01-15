import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Successful getting order details with correct id. Status 200', async ({ request }) => {
  // Test data: 1,2,5,9,10
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/2')
  // Log the response status, body and headers
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Unsuccessful with incorrect id. Status 400', async ({ request }) => {
  // Test data: 0,11
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/11')
  // Log the response status, body and headers
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful with empty id. Status 500', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/')
  // Log the response status, body and headers
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Unsuccessful with id string format. Status 400', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/fgfg')
  // Log the response status, body and headers
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})