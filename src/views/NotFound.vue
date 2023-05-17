<script setup lang="ts">
import { useHead } from '@vueuse/head';
useHead({
  title:'存在しないページ'
})
</script>

<template>
    <h2>Not Found</h2>
    <p>アクセスしたページは存在しません</p>
    <div><button @click="$router.push({path:'/'})">ホーム</button></div>
</template>