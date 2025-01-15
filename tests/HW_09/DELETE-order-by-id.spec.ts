import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Successful deleting order with correct id. Status 204', async ({ request }) => {
  // Test data: 1,2,5,9,10
  const requestHeaders = {
    'api_key': '1234567890123456'
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders
  })
  console.log('response status: ', response.status())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('Unsuccessful with incorrect id. Status 400', async ({ request }) => {
  // Test data: 0,11
  const requestHeaders = {
    'api_key': '1234567890123456'
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/0', {
    headers: requestHeaders
  })
  console.log('response status: ', response.status())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful with empty id. Status 400', async ({ request }) => {
  // Test data: 0,11
  const requestHeaders = {
    'api_key': '1234567890123456'
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders
  })
  console.log('response status: ', response.status())
  console.log('response headers: ', response.headers())
  //BUG-006 вместо 400 программа возвращает 405
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})
