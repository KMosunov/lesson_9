import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Successful getting all orders details. Status 200', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders/get_orders',
    {},
  )
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
})
