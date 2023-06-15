<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { useStoreAuth } from '../stores/login'
import ComponentButton from '@/components/atoms/ComponentButton.vue'
import FormInput from '@/components/atoms/FormInput.vue'

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
  <div class="loginFormArea">
    <div class="loginFormContents">
      <form @submit.prevent="login">
        <fieldset>
          <legend>ログインしてください</legend>
          <FormInput
            inputType="email"
            placeholder="メールアドレス"
            v-model="email"
            inputName="メールアドレス"
          />
          <br />
          <FormInput
            inputType="password"
            placeholder="パスワード"
            v-model="password"
            inputName="パスワード"
          />
          <br />
          <ComponentButton buttonText="ログイン" type="submit" :disabled="disabled" />
          <p>{{ error }}</p>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<style scoped>
.loginFormArea {
  width: 100vw;
  height: 100%;
}

.loginFormContents {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 40%;
  height: auto;
}

fieldset {
  background-color: #f7eccf;
}

legend {
  text-align: center;
  font-weight: 700;
  font-size: 20px;
}
</style>
