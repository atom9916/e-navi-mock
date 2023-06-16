<script setup lang="ts">
import ComponentButton from '../components/atoms/ComponentButton.vue'
</script>

<template>
  <p>登録完了しました</p>
  <div>
    <ComponentButton buttonText="ホーム" @click="$router.push({ path: '/' })" />
  </div>
</template>
