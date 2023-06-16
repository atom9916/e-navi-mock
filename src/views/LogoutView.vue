<template>
  <div class="logout">
    <h2>ログアウトしました</h2>
    <ComponentButton buttonText="再ログイン" @click="$router.push({ path: '/login' })" />
  </div>
</template>

<script setup lang="ts">
import ComponentButton from '../components/atoms/ComponentButton.vue'
</script>

<style scoped>
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  flex-direction: column;
}
</style>
