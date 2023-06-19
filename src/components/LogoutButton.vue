<script setup lang="ts">
import router from '../router'
import { useStoreAuth } from '../stores/login'
import { signOut, getAuth } from 'firebase/auth'
import ComponentButton from './atoms/ComponentButton.vue'
import { useClockIn } from '../stores/clockIn'
import { useClockOut } from '../stores/clockOut'

const auth = getAuth()

const logout = () => {
  signOut(auth)
    .then(() => {
      const store = useStoreAuth()
      const storeClockIn = useClockIn()
      const storeClockOut = useClockOut()
      store.logout()
      storeClockIn.clearClockIn()
      storeClockOut.clearClockOut()
      router.push('/logout')
    })
    .catch((error) => {
      console.log(error.code, error.message)
    })
}
</script>

<template>
  <ComponentButton buttonText="ログアウト" @click="logout" />
</template>
