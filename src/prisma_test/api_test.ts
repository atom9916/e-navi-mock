import { createNotification } from './functions-without-context'
const url = 'http://localhost:3000'

const today = new Date()
const nextWeek = new Date(today.setDate(today.getDate() + 7))

const testData = {
  id: 99999,
  created_at: today,
  deleted_at: nextWeek,
  content: 'すべてのテストで仕様するお知らせデータです。',
  create_user: 'test99999',
  read_user: []
}

const testData2 = {
  id: 77777,
  created_at: today,
  deleted_at: nextWeek,
  content: 'POSTのテスト用データです。',
  create_user: 'test99999',
  read_user: []
}

export async function ApiGetTest() {
  // await createNotification(testData)

  await fetch(`${url}/notification`)
    .then((res) => res.json())
    .then((data) => console.log('GETに成功しました', data))
    .catch((error) => console.log('GETに失敗しました', error))
}

export async function ApiPostTest() {
  await fetch(`${url}/notification`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testData2)
  })
    .then((res) => console.log('POSTに成功しました', res.status))
    .catch((error) => console.log('POSTに失敗しました', error))
}

export async function ApiPutTest() {
  await fetch(`${url}/notification`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 99999,
      content: 'データを編集しました'
    })
  })
    .then((res) => res.json())
    .then((data) => console.log('PUTに成功しました', data))
    .catch((error) => console.log('PUTに失敗しました', error))
}

export async function ApiDeleteTest() {
  await fetch(`${url}/notification`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: 99999
    })
  })
    .then((res) => res.json())
    .then((data) => console.log('DELETEに成功しました', data))
    .catch((error) => console.log('DELETEに失敗しました', error))
}

export async function EnvironmentVariant() {
  require('dotenv').config({ path: '.env.local' })
  console.log(require('dotenv').config({ path: '.env.local' }))
  const ev = process.env.VITE_API_KEY
  console.log('ev', ev)
}

// ApiGetTest()
// ApiPostTest()
// ApiPutTest()
// ApiDeleteTest()
// EnvironmentVariant()

// GET・POST・DELETE・PUTのリクエストが正常に動作することが確認済です。
