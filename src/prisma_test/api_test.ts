const url = 'http://localhost:4242'

export async function ApiGetTest() {
  await fetch(`${url}/users`)
    .then((res) => res.json())
    .then((data) => console.log('GETに成功しました', data))
    .catch((error) => console.log('GETに失敗しました', error))
}

export async function ApiPostTest() {
  await fetch(`${url}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'yuka2',
      email: 'yuka2@prisma.io',
      password: 'yuka2',
      departmentId: 1
    })
  })
    .then((res) => res.json())
    .then((data) => console.log('POSTに成功しました', data))
    .catch((error) => console.log('POSTに失敗しました', error))
}

export async function ApiPutTest() {
  const userId = 2
  await fetch(`${url}/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // name: 'yuka takahashi',
      // email: 'yuka@prisma.io',
      password: 'yuka2023'
    })
  })
    .then((res) => res.json())
    .then((data) => console.log('PUTに成功しました', data))
    .catch((error) => console.log('PUTに失敗しました', error))
}

export async function ApiDeleteTest() {
  const userId = 3
  await fetch(`${url}/users/${userId}`, {
    method: 'DELETE'
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

// GET・POST・DELETEのリクエストは正常に動作することが確認済です。
// PUTについては、name,emailの変更は反映されるのですが、それ以外の変更が反映されないという不具合が発生しているため、
// 現在原因調査中です。
