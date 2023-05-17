<script setup lang="ts">
import { useHead } from '@vueuse/head';
import HomeButton from '../components/HomeButton.vue';
useHead({
  title:'存在しないページ'
})
</script>

<template>
    <h2>Not Found</h2>
    <p>アクセスしたページは存在しません</p>
    <HomeButton/>
</template>