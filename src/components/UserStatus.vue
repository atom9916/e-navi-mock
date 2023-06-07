<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, /*signOut,*/ onAuthStateChanged } from '@firebase/auth'
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore'
import { useUserInfoStore } from '../stores/userInfo'

const auth = getAuth()
// const router = useRouter()
const db = getFirestore()

// const userInfo = ref()
const isLoading = ref(true)
const isAuthenticated = ref(false)

// storeをインポートしまして、userInfoをstoreに格納してます
const store = useUserInfoStore()

// logoutを他で実施のためコメントアウト
// const logout = () => {
//   signOut(auth)
//     .then(() => {
//       isAuthenticated.value = false
//     })
//     .catch((error) => {
//       console.log(error.code, error.message)
//     })
// }
// const login = () => {
//   router.push('/login')
// }

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isAuthenticated.value = true
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('email', '==', user.email))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        store.setUserInfo(doc.data())
      })
      isLoading.value = false
    } else {
      store.clearUserInfo()
    }
  })
})
</script>

<template>
  <div v-if="isLoading"></div>

  <div v-else>
    <div v-if="isAuthenticated">
      <p>{{ store.userInfo ? `ログイン中:${store.userInfo.name}さん` : ' ' }}</p>
    </div>
    <div v-else>
      <p>ログインしていません</p>
    </div>
  </div>
</template>
