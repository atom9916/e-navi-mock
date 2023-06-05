<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import RealTimeClock from '../components/realTimeClock.vue'
import { useHead } from '@vueuse/head'
// import SampleAttendance from '@/components/SampleAttendance.vue';
import sampleTest2 from '@/components/sampleTest2.vue';
useHead({
  title: 'メインページ'
})
</script>

<template>
  <main>
    <h3>ホーム</h3>
    <div><RealTimeClock /></div>
    <!-- <SampleAttendance/> -->
    <sampleTest2/>
  </main>
</template>
