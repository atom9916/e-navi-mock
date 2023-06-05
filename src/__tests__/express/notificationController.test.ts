const request = require('supertest')
import { server } from '../../server'
import prisma from '../../../client'
import { createNotification } from '@/lib/prisma/notification/create'

const today = new Date()
const nextWeek = new Date(today.setDate(today.getDate() + 7))

beforeEach(async () => {
  const testData = {
    id: 99999,
    created_at: today,
    deleted_at: nextWeek,
    content: 'すべてのテストで仕様するお知らせデータです。',
    create_user: 'test99999',
    read_user: []
  }
  await createNotification(testData)
})

afterEach(async () => {
  await prisma.notification.deleteMany()
})

afterAll(async () => {
  await prisma.notification.deleteMany()

  await prisma.$disconnect()
})

describe('notificationControllerのテスト', () => {
  test('GETメソッドが成功するとステータス200が返される', () => {
    return request(server)
      .get('/notification/')
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })
  test('GETメソッドが失敗するとステータス404が返される', () => {
    return request(server)
      .get('/notificatio/') // URLのスペルミス
      .then((res) => {
        expect(res.statusCode).toBe(404)
      })
  })

  test('POSTメソッドが成功するとステータス200が返される', () => {
    const newNotification = {
      created_at: today,
      deleted_at: nextWeek,
      content: 'テスト用の新しいお知らせです。',
      create_user: 'test99999',
      read_user: []
    }

    return request(server)
      .post('/notification/', {
        body: newNotification
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('POSTメソッドが失敗すると、ステータス400が返される', () => {
    const errorData = {
      deleted_at: 'nextWeek', //Date型ではなく文字列型になっている
      content: 'エラーが発生するデータです。',
      create_user: 'test99999',
      read_user: []
    }

    return request(server)
      .post('/notification/', {
        body: errorData
      })
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })
  })

  test('PUTメソッドに成功するとステータス200が返ってくる', () => {
    const updateData = {
      id: 99999,
      content: '更新後のデータです'
    }

    return request(server)
      .put('/notification/', {
        body: updateData
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('PUTメソッドに失敗するとステータス400が返ってくる', () => {
    const errorData = {
      id: 12345, //存在しないid
      content: '更新に失敗するデータです'
    }

    return request(server)
      .put('/notification/', {
        body: errorData
      })
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })
  })

  test('DELETEメソッドに成功するとステータス200が返ってくる', () => {
    return request(server)
      .delete('/notification/', {
        id: 99999
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('DELETEメソッドに失敗するとステータス400が返ってくる', () => {
    return request(server)
      .delete('/notification/') //idを指定しない
      .then((res) => {
        console.log(res.message)
        expect(res.statusCode).toBe(400)
      })
  })
})
