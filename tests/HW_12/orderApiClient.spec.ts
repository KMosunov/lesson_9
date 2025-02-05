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
    const responseOrderStatus = await request.get(
      `https://backend.tallinn-learning.ee/orders/${await apiClient.createOrderAndReturnOrderId()}`,
      {
        headers: {
          Authorization: 'Bearer ' + apiClient.jwt,
        },
      },
    )
    expect(responseOrderStatus.status()).toBe(StatusCodes.OK)
    const requestedOrder = OrderDTO.serializeResponse(await responseOrderStatus.json())
    expect(requestedOrder.status).toBeDefined()
    expect(requestedOrder.status).toBe('OPEN')
  })

  test('TL-12-4 API Successful authorization, order creation, order status and delete', async ({
    request,
  }) => {
    const apiClient = await ApiClient.getInstance(request)
    await apiClient.deleteOrder()
  })
})
