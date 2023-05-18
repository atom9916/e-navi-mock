<script setup lang="ts">
import { useHead } from '@vueuse/head'
import TimeEntryForm from '../components/TimeEntryForm.vue';
useHead({
  title: '日次勤怠'
})
</script>

<template>
  <h2>日次勤怠</h2>
  <TimeEntryForm/>
  <div>
    <button @click="$router.push({ path: '/dayly/attendanceRegistration' })">登録する</button>
  </div>
</template>
