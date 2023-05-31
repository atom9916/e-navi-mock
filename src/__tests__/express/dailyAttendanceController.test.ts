const request = require('supertest')
import { server } from '../../server'

const today = new Date()

describe('/dayにリクエストを送信する', () => {
  beforeEach(() => {})

  afterEach(() => {})

  test('GETメソッドでリクエストを送信するとステータス200とデータが返ってくる', () => {
    return request(server)
      .get('/day/')
      .then((res) => {
        console.log('データ', res.body)
        expect(res.statusCode).toBe(200)
      })
  })

  test('正しいデータをPOSTすると、ステータス200が返される', () => {
    const newWorkData = {
      userId: 999,
      date: today,
      state: '入力済',
      attendance: '出勤',
      punch_in: 9,
      punch_out: 18,
      break_time: 1,
      work_hour: 8,
      tardiness: 'なし'
    }

    return request(server)
      .post('/day/', {
        body: newWorkData
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('不正なデータをPOSTすると、ステータス400が返される', () => {
    const errorData = {
      userId: 123,
      date: today,
      state: 123456, //本来は文字列
      attendance: '出勤',
      punch_in: '本来は数値'
    }

    return request(server)
      .post('/day/', {
        body: errorData
      })
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })
  })

  test('PUTメソッド', () => {
    return request(server)
      .put('/day/')
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })

  test('正しい引数でDELETEメソッドを呼び出すと、ステータス200が返ってくる', () => {
    const userId = 999
    return request(server)
      .delete(`/day/${userId}`)
      .then((res) => {
        expect(res.statusCode).toBe(200)
      })
  })
})
