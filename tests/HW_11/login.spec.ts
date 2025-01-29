import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDTO } from '../DTO/LoginDTO'

test.describe('Login tests', async () => {
  test('Successful authorization', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    console.log(await response.text())
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect
      .soft(/^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(await response.text()))
      .toBeTruthy()
  })
  test('Unsuccessful authorization with GET method', async ({ request }) => {
    const response = await request.get('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Unsuccessful authorization with DEL method', async ({ request }) => {
    const response = await request.delete('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Unsuccessful authorization with PUT method', async ({ request }) => {
    const response = await request.put('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Unsuccessful authorization with PATCH method', async ({ request }) => {
    const response = await request.patch('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    console.log(await response.text())
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('Unsuccessful authorization with incorrect credentials', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithIncorrectData(),
    })
    console.log(await response.text())
    console.log('response status:', response.status())
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  })
})
