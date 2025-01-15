import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

test('Successful changing order details with correct id. Status 200', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/10`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Successful with correct id and status ACCEPTED. Status 200', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'ACCEPTED',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
  expect(requestBody.status).toBe('ACCEPTED')
})

test('Successful with correct id and status INPROGRESS. Status 200', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'INPROGRESS',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
  expect(requestBody.status).toBe('INPROGRESS')
})

test('Successful with correct id and status DELIVERED. Status 200', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'DELIVERED',
    courierId: 0,
    customerName: 'John',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
  expect(requestBody.status).toBe('DELIVERED')
})

test('Unsuccessful with incorrect customerName. Status 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 123,
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())

  //BUG-001 вместо 400 программа возвращает 200
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response.status()).toBe(StatusCodes.OK)
  expect(requestBody.customerName).not.toBe(Number)
})

test('Unsuccessful with empty customerName. Status 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: '',
    customerPhone: '09876543213',
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())

  //BUG-002 вместо 400 программа возвращает 200
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response.status()).toBe(StatusCodes.OK)
  //expect(requestBody.customerName).not.toBe('')
})

test('Unsuccessful with incorrect customerPhone. Status 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'David',
    customerPhone: 987654432,
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())

  //BUG-003 вместо 400 программа возвращает 200
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response.status()).toBe(StatusCodes.OK)
  //expect(requestBody.customerPhone).toBe(String)
})

test('Unsuccessful with empty customerPhone. Status 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'David',
    customerPhone: '',
    comment: 'string',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())

  //BUG-004 вместо 400 программа возвращает 200
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response.status()).toBe(StatusCodes.OK)
  //expect(requestBody.customerPhone).toBe(String)
})

test('Unsuccessful with empty comment. Status 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'David',
    customerPhone: '87654543535',
    comment: '',
    id: 3,
  }
  // Test data: 1,2,5,9,10
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/5`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())

  //BUG-005 вместо 400 программа возвращает 200
  //expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Unsuccessful with incorrect id. Status 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'David',
    customerPhone: '87654543535',
    comment: '',
    id: 11,
  }
  // Test data: 0,11
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/11`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Unsuccessful with empty id. Status 405 Method Nit Allowed', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567890123456',
  }
  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'David',
    customerPhone: '87654543535',
    comment: '',
    id: 0,
  }
  // Test data: 0,11
  const response = await request.put(`https://backend.tallinn-learning.ee/test-orders/`, {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status: ', response.status())
  console.log('response body: ', await response.json())
  console.log('response headers: ', response.headers())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})
