<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'

useHead({
  title: 'ログイン'
})

const email = ref('')
const password = ref('')
const disabled = ref(false)
const router = useRouter()
const auth = getAuth()

const isAuthenticated = ref(false)

const login = () => {
  disabled.value = true
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('Login!', user)
      isAuthenticated.value = !isAuthenticated.value
      router.push('/')
    })
    .catch((error) => {
      console.log(error.code, error.message)
      disabled.value = false
    })
}
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <h2>ログイン</h2>
      <input type="email" v-model="email" placeholder="メールアドレス" required />
      <br />
      <input type="password" v-model="password" placeholder="パスワード" required />
      <br />
      <button type="submit" :disabled="disabled">ログイン</button>
    </form>
  </div>
</template>
