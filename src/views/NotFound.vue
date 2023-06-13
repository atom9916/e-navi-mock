<script setup lang="ts">
import { useHead } from '@vueuse/head';
import ComponentButton from '@/components/ComponentButton.vue';
useHead({
  title:'存在しないページ'
})
</script>

<template>
    <h2>Not Found</h2>
    <p>アクセスしたページは存在しません</p>
    <ComponentButton buttonText="ホーム" @click="$router.push({ path: '/' })"/>
</template>