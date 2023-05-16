<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signOut, onAuthStateChanged } from '@firebase/auth'

const auth = getAuth()
const router = useRouter()
const userInfo = ref({})
const isAuthenticated = ref(false)

// ユーザーがログインしているときにユーザー情報を取得する
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.value = user
    isAuthenticated.value = !isAuthenticated.value
  } else {
    userInfo.value = null
  }
})

const logout = () => {
  signOut(auth)
    .then(() => {
      isAuthenticated.value = !isAuthenticated.value
    })
    .catch((error) => {
      console.log(error.code, error.message)
    })
}

const login = () => {
  router.push('/login')
}
</script>

<template>
  <div>
    <p>
      {{ userInfo ? 'ログイン中' : 'ログアウト中' }}
    </p>
    <button v-if="isAuthenticated" @click="logout">ログアウト</button>
    <button v-else @click="login">ログイン</button>
  </div>
</template>
