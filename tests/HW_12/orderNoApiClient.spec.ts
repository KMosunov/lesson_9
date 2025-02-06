import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDTO } from '../DTO/LoginDTO'
import { OrderDTO } from '../DTO/OrderDto'

test.describe('Order tests NO API', async () => {
  test('TL-12-1 Successful authorization', async ({ request }) => {
    const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    console.log(await response.text())
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(/^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(await response.text())).toBeTruthy()
  })

  test('TL-12-2 NO API Client Successful authorization and order creation', async ({ request }) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    expect(responseLogin.status()).toBe(StatusCodes.OK)

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ${await responseLogin.text()}`,
      },
    })
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  })

  test('TL-12-3 NO API Client Successful authorization, order creation and order status', async ({request}) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    expect(responseLogin.status()).toBe(StatusCodes.OK)

    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ${await responseLogin.text()}`,
      },
    })
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)

    const createdOrder = OrderDTO.serializeResponse(await responseCreateOrder.json())
    expect(createdOrder.id).toBeDefined()
    expect(createdOrder.id).toBeGreaterThan(0)

    const responseOrderStatus = await request.get(`https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,{
        headers: {
          Authorization: `Bearer ${await responseLogin.text()}`,
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)

    const requestedOrder = OrderDTO.serializeResponse(await responseOrderStatus.json())
    console.log(requestedOrder)
    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
  })

  test('TL-12-4 No Api Client Successful authorization, order creation, order status and delete', async ({request}) => {
    const responseLogin = await request.post('https://backend.tallinn-learning.ee/login/student', {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ${await responseLogin.text()}`,
      },
    })
    const createdOrder = OrderDTO.serializeResponse(await responseCreateOrder.json())
    const deleteOrder = await request.delete(`https://backend.tallinn-learning.ee/orders/${createdOrder.id}`,{
        headers: {
          Authorization: `Bearer ${await responseLogin.text()}`,
        },
      },
    )
    expect(deleteOrder.status()).toBe(StatusCodes.OK)
  })
})
