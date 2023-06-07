const request = require('supertest')
import { server } from '../../server'

describe('/にリクエストを送信する', () => {
  test('GETメソッド', () => {
    return request(server)
      .get('/')
      .then((response) => {
        console.log('response-message', response.body.message)
        expect(response.statusCode).toBe(200)
      })
  })
})

describe('/notificationにリクエストを送信する', () => {
  test('GETメソッド', () => {
    return request(server)
      .get('/notification/')
      .then((res) => {
        console.log('データ', res.body)
        expect(res.statusCode).toBe(200)
      })
  })

  test('POSTメソッド', () => {
    return request(server)
      .post('/notification/')
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('PUTメソッド', () => {
    return request(server)
      .put('/notification/')
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('DELETEメソッド', () => {
    return request(server)
      .delete(`/notification/`)
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })
})
