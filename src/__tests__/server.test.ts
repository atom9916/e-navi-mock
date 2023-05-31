const request = require('supertest')
import { server } from '../server'

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

describe('/monthにリクエストを送信する', () => {
  test('GETメソッド', () => {
    return request(server)
      .get('/month/')
      .then((res) => {
        console.log('データ', res.body)
        expect(res.statusCode).toBe(200)
      })
  })

  test('POSTメソッド', () => {
    return request(server)
      .post('/month/')
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('PUTメソッド', () => {
    return request(server)
      .put('/month/')
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('DELETEメソッド', () => {
    const userId = 999
    return request(server)
      .delete(`/month/${userId}`)
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })
})
