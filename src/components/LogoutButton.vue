<script setup lang="ts">
import router from '../router'
import { useStoreAuth } from '../stores/login'
import { signOut, getAuth } from 'firebase/auth'

const auth = getAuth()

const logout = () => {
  signOut(auth).then(() => {
    const store = useStoreAuth()
    store.logout()
    router.push('/logout')
  }).catch((error)=>{
    console.log(error.code,error.message)
  })
}
</script>

<template>
  <button @click="logout">ログアウト</button>
</template>
