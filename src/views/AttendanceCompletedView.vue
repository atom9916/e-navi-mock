<script setup lang="ts">
import ComponentButton from '../components/ComponentButton.vue'
</script>

<template>
  <p>登録完了しました</p>
  <div>
    <ComponentButton buttonText="ホーム" @click="$router.push({ path: '/' })"/>
  </div>
</template>
