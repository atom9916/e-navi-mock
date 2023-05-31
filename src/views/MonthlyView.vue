<script setup lang="ts">
import { useHead } from '@vueuse/head';
import GetDalyAttendace from '@/components/GetDalyAttendace.vue';
useHead({
  title:'月次勤怠'
})
</script>

<template>
    <h2>月次勤怠</h2>
    <GetDalyAttendace/>
</template>