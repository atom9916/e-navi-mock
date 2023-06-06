<!-- ユーザー登録とログインテスト用コンポーネント -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '@firebase/auth'
import { setDoc, doc, getFirestore } from 'firebase/firestore'
import axios from 'axios'

const auth = getAuth()
const db = getFirestore()
const name = ref('')
const departmentId = ref(null)
const email = ref('')
const password = ref('')
const loginEmail = ref('')
const loginPassword = ref('')
const admin = ref(false)

const signUp = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      setDoc(doc(db, 'users', userCredential.user.uid), {
        user_id: userCredential.user.uid,
        name: name.value,
        department_id: departmentId.value,
        email: email.value,
        password: password.value,
        admin: admin.value
      }).then(() => {
        name.value = ''
        departmentId.value = null
        email.value = ''
        password.value = ''
        admin.value = false
      })
    })
    .catch((error) => {
      console.log(error.code, error.message)
    })
}

const login = () => {
  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('Login!', user)
    })
    .catch((error) => {
      console.log(error.code, error.message)
    })
}

const logout = () => {
  signOut(auth)
    .then(() => {
      console.log('Logout!')
    })
    .catch((error) => {
      console.log(error.code, error.message)
    })
}

const checkAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in!', user)
    } else {
      console.log('User is signed out!')
    }
  })
}

const awsPostTest = async (userId: string) => {
  const expressResponse = await axios.get(`http://localhost:3000/daily/${userId}`)

  fetch('https://2zrdh8abfj.execute-api.ap-northeast-1.amazonaws.com/prod/backup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_AWS_API_KEY
    },
    body: JSON.stringify({
      userId: userId,
      daily: expressResponse.data.dailyWorkDataByUserId
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

const dynamoGetTest = async () => {
  fetch('https://2zrdh8abfj.execute-api.ap-northeast-1.amazonaws.com/prod/getdaily', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_AWS_API_KEY
    },
    body: JSON.stringify({
      userId: 'onGE8VNwcFSUj6JB64rK83J5SEA3',
      year: 2023,
      month: 5
    })
  })
    .then((response) => response.json())
    .then((data) => {
      const parseData = JSON.parse(data.body)
      console.log(parseData.Items[0])
    })
    .catch((error) => {
      console.log(error)
    })
}

const dynamoPostTest = async () => {
  const date = new Date()
  fetch('https://2zrdh8abfj.execute-api.ap-northeast-1.amazonaws.com/prod/postdaily', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_AWS_API_KEY
    },
    body: JSON.stringify({
      userId: 'onGE8VNwcFSUj6JB64rK83J5SEA3',
      date: date,
      state: '承認済',
      attendance: '出勤',
      punchIn: '09:00',
      punchOut: '18:00',
      breakTime: '01:00',
      workHour: 8,
      tardiness: 'なし',
      comment: ''
    })
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  console.log('LoginTest.vue is mounted!')
})
</script>

<template>
  <div>
    <h2>Sign Up</h2>
    <p>
      <input type="text" v-model="name" placeholder="Name" /><br />
      <input type="number" v-model="departmentId" placeholder="Department" /><br />
      <input type="text" v-model="email" placeholder="Email" /><br />
      <input type="password" v-model="password" placeholder="Password" /><br />
      <input type="checkbox" v-model="admin" /><br />
      <button @click="signUp">Sign Up</button>
      <button @click="awsPostTest('1')">AWS Post Test</button>
      <button @click="dynamoGetTest()">DynamoDB Get Test</button>
      <button @click="dynamoPostTest()">DynamoDB POST Test</button>
    </p>
  </div>

  <div>
    <h2>Login</h2>
    <p>
      <input type="text" v-model="loginEmail" placeholder="Email" />
      <input type="password" v-model="loginPassword" placeholder="Password" />
      <button @click="login">Login</button>
      <button @click="logout">Logout</button>
      <button @click="checkAuth">Check Auth</button>
    </p>
  </div>
</template>
