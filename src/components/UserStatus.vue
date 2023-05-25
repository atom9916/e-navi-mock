<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { getAuth, /*signOut,*/ onAuthStateChanged } from '@firebase/auth'
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore'
import { provide } from 'vue';

const auth = getAuth()
// const router = useRouter()
const db = getFirestore()

const userInfo = ref()
const isLoading = ref(true)
const isAuthenticated = ref(false)

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
        userInfo.value = doc.data()
      })
      isLoading.value = false
    } else {
      userInfo.value = null
    }
  })
  provide('userInfo',userInfo)
})
</script>

<template>
  <div v-if="isLoading"></div>
  
  <div v-else>
    <div v-if="isAuthenticated">
      <p>{{ userInfo ? `${userInfo.name}さんがログイン中` : ' ' }}</p>
      <p>{{ userInfo }}</p>
      <!-- <button @click="logout">ログアウト</button> -->
    </div>
    <div v-else>
      <p>ログインしていません</p>
      <!-- <button @click="login">ログイン</button> -->
    </div>
  </div>
</template>
