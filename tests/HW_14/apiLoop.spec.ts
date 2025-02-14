import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'

const baseURL = 'http://localhost:3000/users'

test.describe('TL-14-01 User management API with loop', () => {
  test.beforeEach(async ({ request }) => {
    const response = await request.get(`${baseURL}`)
    const responseBody = await response.json()
    const numberOfObjects = responseBody.length

    const userIDs = []
    for (let i = 0; i < numberOfObjects; i++) {
      const userID = responseBody[i].id
      userIDs.push(userID)
    }

    for (let i = 0; i < numberOfObjects; i++) {
      const response = await request.delete(`${baseURL}/${userIDs[i]}`)
      expect.soft(response.status()).toBe(StatusCodes.OK)
    }

    const responseAfterDelete = await request.get(`${baseURL}`)
    expect(responseAfterDelete.status()).toBe(StatusCodes.OK)

    const responseBodyEmpty = await responseAfterDelete.text()
    expect(responseBodyEmpty).toBe('[]')
  })

  test('TL-14-01 GET / - should return empty when no users', async ({ request }) => {
    const response = await request.get(`${baseURL}`)
    expect(response.status()).toBe(StatusCodes.OK)
    const responseBody = await response.text()
    expect(responseBody).toBe('[]')
  })

  test('TL-14-02 Create few users, check status and verify total number', async ({ request }) => {
    const user1 = await request.post(`${baseURL}`)
    const user2 = await request.post(`${baseURL}`)
    const user3 = await request.post(`${baseURL}`)

    const users = [user1, user2, user3]

    for (let i = 0; i < users.length; i++) {
      const json = await users[i].json()
      expect(json.id).toBeDefined()

      const responseStatus = users[i].status()
      expect(responseStatus).toBe(StatusCodes.CREATED)
      expect(users.length).toBe(3)
    }
  })

  test('TL-14-03 Delete all users and verify empty response', async ({ request }) => {
    const user1 = await request.post(`${baseURL}`)
    const user2 = await request.post(`${baseURL}`)
    const user3 = await request.post(`${baseURL}`)

    const users = [user1, user2, user3]

    for (let i = 0; i < users.length; i++) {
      const json = await users[i].json()
      const id = await json.id

      const deleteAllUsers = await request.delete(`${baseURL}/${id}`)
      expect(deleteAllUsers.status()).toBe(StatusCodes.OK)
    }

    const responseAfterDelete = await request.get(`${baseURL}`)
    expect(responseAfterDelete.status()).toBe(StatusCodes.OK)

    const responseBodyEmpty = await responseAfterDelete.text()
    expect(responseBodyEmpty).toBe('[]')
  })
  test('TL-14-04 Delete one user and verify other users', async ({ request }) => {
    const user1 = await request.post(`${baseURL}`)
    const user2 = await request.post(`${baseURL}`)
    const user3 = await request.post(`${baseURL}`)

    const users = [user1, user2, user3]
    console.log('Total number of users: ' + users.length)
    users.pop()
    console.log('Number of users after deleting one of them: ' + users.length)

    for (let i = 0; i < users.length; i++) {
      expect(users[i].status()).toBe(StatusCodes.CREATED)
    }
  })
})
