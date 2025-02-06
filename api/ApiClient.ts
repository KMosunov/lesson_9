import { APIRequestContext } from 'playwright-core'
import { LoginDTO } from '../tests/DTO/LoginDTO'
import { StatusCodes } from 'http-status-codes'
import { OrderDTO } from '../tests/DTO/OrderDto'
import { expect } from '@playwright/test'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

export class ApiClient {
  static instance: ApiClient
  private request: APIRequestContext
  jwt: string = ''

  private constructor(request: APIRequestContext) {
    this.request = request
  }

  public static async getInstance(request: APIRequestContext): Promise<ApiClient> {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(request)
      await this.instance.requestJwt()
    }
    return ApiClient.instance
  }

  async requestJwt(): Promise<void> {
    console.log('Requesting JWT')
    const responseLogin = await this.request.post(`${serviceURL}${loginPath}`, {
      data: LoginDTO.createLoginWithCorrectData(),
    })
    if (responseLogin.status() !== StatusCodes.OK) {
      console.log('Authorization failed')
      throw new Error(`Request failed with status ${responseLogin.status()}`)
    }

    this.jwt = await responseLogin.text()
    console.log(`JWT received:  ${this.jwt}`)
  }

  async createOrderAndReturnOrderId(): Promise<number> {
    console.log('Creating order ...')
    const responsePost = await this.request.post(`${serviceURL}${orderPath}`, {
      data: OrderDTO.generateRandomOrderDto(),
      headers: {
        Authorization: `Bearer ${this.jwt}`,
      },
    })

    console.log('Order response: ', responsePost)

    expect(responsePost.status()).toBe(StatusCodes.OK)
    const responseBody = await responsePost.json()
    console.log('Order created: ')
    console.log(responseBody)

    return responseBody.id
  }

  async deleteOrder(): Promise<void> {
    console.log('Deleting order ...')
    const responseDel = await this.request.delete(
      `${serviceURL}${orderPath}/${await this.createOrderAndReturnOrderId()}`,
      {
        headers: {
          Authorization: `Bearer ${this.jwt}`,
        },
      },
    )

    console.log('Order del response: ', responseDel)

    expect(responseDel.status()).toBe(StatusCodes.OK)
    const responseBody = await responseDel.json()
    console.log('Order deleted: ', responseBody)
    expect(responseBody).toBe(true)

  }
}
