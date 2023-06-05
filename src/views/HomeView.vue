<script setup lang="ts">
import RealTimeClock from '../components/realTimeClock.vue'
import { useHead } from '@vueuse/head'
import SampleAttendance from '@/components/SampleAttendance.vue';
useHead({
  title: 'メインページ'
})
</script>

<template>
  <main>
    <h3>ホーム</h3>
    <RealTimeClock />
    <br>
    <SampleAttendance/>
  </main>
</template>
