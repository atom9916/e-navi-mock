<script setup lang="ts">
import { useHead } from '@vueuse/head'
import TimeEntryForm from '../components/TimeEntryForm.vue';
import AttendantStatus from '@/components/AttendantStatus.vue';
import TardinessStatus from '@/components/TardinessStatus.vue';
useHead({
  title: '日次勤怠'
})
</script>

<template>
  <h2>日次勤怠</h2>
  <AttendantStatus/>
  <br>
  <TimeEntryForm/>
  <TardinessStatus/>
  <br>
  <div>
    <button @click="$router.push({ path: '/dayly/attendanceRegistration' })">登録する</button>
  </div>
</template>
