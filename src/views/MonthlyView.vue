<script setup lang="ts">
import { useHead } from '@vueuse/head'
import GetDalyAttendace from '@/components/GetDalyAttendace.vue'
useHead({
  title: '月次勤怠'
})
</script>

<template>
  <GetDalyAttendace />
</template>
