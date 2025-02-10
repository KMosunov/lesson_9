import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { OrderDTO } from '../DTO/OrderDto'
import { ApiClient } from '../../api/ApiClient'

test.describe('Order tests API Client', async () => {
  test('TL-12-1 API Client Successful authorization', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    expect(apiClient.jwt).not.toBeUndefined()
    expect(/^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(apiClient.jwt)).toBeTruthy()
  })

  test('TL-12-2 API Client Successful authorization and order creation', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const responseCreateOrder = await request.post('https://backend.tallinn-learning.ee/orders', {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ` + apiClient.jwt,
      },
    })
    console.log(await responseCreateOrder.json())
    expect(responseCreateOrder.status()).toBe(StatusCodes.OK)
  })

  test('TL-12-3 API Successful authorization, order creation and order status', async ({
    request,
  }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    const responseOrderStatus = await apiClient.getOrderById(orderId)
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)
    const requestedOrder = OrderDTO.serializeResponse(await responseOrderStatus.json())
    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
  })

  test('TL-12-4 API Successful authorization, order creation, delete and check', async ({
    request,
  }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    await apiClient.deleteOrder(orderId)
    const check = await apiClient.getOrderById(orderId)

    const response = await check.text()
    expect.soft(response).toBe('')
    expect.soft(check.status()).toBe(StatusCodes.NOT_FOUND) //BUG: 200 instead of 404
  })
})
