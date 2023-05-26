V<script setup lang="ts">
import { useHead } from '@vueuse/head';
useHead({
  title:'勤怠登録確認'
})


</script>

<template>
    <h2>以下の内容で登録します</h2>
    <button @click="$router.push({path:'/daily/attendanceRegistration/attendanceCompleted'})">登録</button>
</template>