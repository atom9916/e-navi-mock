<script setup lang="ts">
import { useHead } from '@vueuse/head';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

useHead({
  title:'ログイン'
})

const email = ref('')
const password = ref('')
const router = useRouter()

const isAuthenticated = ref(false)

const login = () =>{
  isAuthenticated.value = !isAuthenticated.value  
  router.push('/')
}
</script>

<template>
    <div>
    <form @submit.prevent="login">
    <h2>ログイン</h2>
    <input type="email" v-model="email" placeholder="メールアドレス" required>
    <br>
    <input type="password" v-model="password" placeholder="パスワード" required>
    <br>
    <button type="submit">ログイン</button>
</form>
</div>
</template>