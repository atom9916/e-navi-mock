  <script setup lang="ts">
  import { useHead } from '@vueuse/head'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAuth, signInWithEmailAndPassword } from '@firebase/auth' 
  import {useStoreAuth} from '../stores/login'

  useHead({
    title: 'ログイン'
  })

  const email = ref('')
  const password = ref('')
  const disabled = ref(false)
  const error = ref('')
  const router = useRouter()
  const auth = getAuth()

const login = async () => {

  const store = useStoreAuth()

  disabled.value = true
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      store.login()
      router.push('/')
    })
    // .then(()=>{
    //   router.push('/')
    // })
    .catch((error) => {
      checkError(error.code)
      disabled.value = false
      password.value = ''
    })
}

const checkError = (code: string) => {
  if (code === 'auth/user-not-found') {
    error.value = 'ユーザーが見つかりませんでした'
  } else if (code === 'auth/wrong-password') {
    error.value = 'パスワードが間違っています'
  } else {
    error.value = 'ログインに失敗しました'
  }
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
      <p>{{ error }}</p>
    </form>
  </div>
</template>
