const request = require('supertest')
import { server } from '../../server'

const today = new Date()
const nextWeek = new Date(today.setDate(today.getDate() + 7))

describe('notificationControllerのテスト', () => {
  test('GETメソッドが成功するとステータス200が返される', async () => {
    return await request(server)
      .get('/notification/')
      .then((res) => {
        console.log('GET Data', res.data)
        expect(res.statusCode).toBe(200)
      })
  })
  test('GETメソッドが失敗するとステータス404が返される', async () => {
    return await request(server)
      .get('/notificatio/') // URLのスペルミス
      .then((res) => {
        expect(res.statusCode).toBe(404)
      })
  })

  test('POSTメソッドが成功するとステータス200が返される', () => {
    const newNotification = {
      id: 99999,
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
        console.log(res.body.message)
        expect(res.statusCode).toBe(200)
      })
  })

  test('POSTメソッドが失敗すると、ステータス400が返される', async () => {
    const errorData = {
      deleted_at: 'nextWeek', //Date型ではなく文字列型になっている
      content: 'エラーが発生するデータです。'
    }

    return await request(server)
      .post('/notification/', {
        body: errorData
      })
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })
  })

  test('PUTメソッドに成功するとステータス200が返ってくる', async () => {
    const updateData = {
      id: 99999,
      content: '更新後のデータです'
    }

    return await request(server)
      .put('/notification/', {
        body: JSON.stringify(updateData)
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('PUTメソッドに失敗するとステータス400が返ってくる', async () => {
    const errorData = {
      id: 12345, //存在しないid
      content: '更新に失敗するデータです'
    }

    return await request(server)
      .put('/notification/', {
        body: JSON.stringify(errorData)
      })
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })
  })

  test('DELETEメソッドに成功するとステータス200が返ってくる', async () => {
    return await request(server)
      .delete('/notification/', {
        body: JSON.stringify({ id: 99999 })
      })
      .then((res) => {
        console.log('レスポンスメッセージ', res.body.message)
        expect(res.statusCode).toBe(200)
      })
  })

  test('DELETEメソッドに失敗するとステータス400が返ってくる', async () => {
    return await request(server)
      .delete('/notification/') //idを指定しない
      .then((res) => {
        console.log('レスポンスメッセージ', res.body.message)
        expect(res.statusCode).toBe(400)
      })
  })
})
