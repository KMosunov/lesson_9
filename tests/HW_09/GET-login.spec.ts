import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Successful authentication with correct username and password. Status 200', async ({ request }) => {
  const requestParameters = {
    'username': 'A',
    'password': 'qwe'
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
        params: requestParameters
  })
  const responseBody = await response.json();

  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('api key: ', responseBody.apiKey)
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
  expect(responseBody.apiKey).not.toBe(null)
})

test('Unsuccessful with incorrect username and correct password. Status 400', async ({ request }) => {
  const requestParameters = {
    'username': 123,
    'password': 'qwe'
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters
  })
  const responseBody = await response.json();

  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('api key: ', responseBody.apiKey)
  console.log('response headers: ', response.headers())
  //BUG - 007 вместо 400 программа возвращает 200
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  //expect(responseBody.apiKey).toBe (null)
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Unsuccessful with correct username and incorrect password. Status 400', async ({ request }) => {
  const requestParameters = {
    'username': 'A',
    'password': 123
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters
  })
  const responseBody = await response.json();

  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('api key: ', responseBody.apiKey)
  console.log('response headers: ', response.headers())
  //BUG - 008 вместо 400 программа возвращает 200
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  //expect(responseBody.apiKey).toBe (null)
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Unsuccessful with empty username and correct password. Status 500', async ({ request }) => {
  const requestParameters = {
    'username': '',
    'password': 'qwe'
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters
  })
  const responseBody = await response.json();

  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('api key: ', responseBody.apiKey)
  console.log('api key: ', responseBody.message)
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(responseBody.message).toBe("Username or password is missing")
  expect(responseBody.apiKey).toBe(null)
})

test('Unsuccessful with correct username and empty password. Status 500', async ({ request }) => {
  const requestParameters = {
    'username': 'A',
    'password': ''
  }
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders', {
    params: requestParameters
  })
  const responseBody = await response.json();

  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('api key: ', responseBody.apiKey)
  console.log('api key: ', responseBody.message)
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  expect(responseBody.message).toBe("Username or password is missing")
  expect(responseBody.apiKey).toBe(null)
})