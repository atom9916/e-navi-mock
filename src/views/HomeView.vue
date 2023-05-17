<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import RealTimeClock from '../components/realTimeClock.vue'
import UserStatus from '../components/UserStatus.vue'
import { useHead } from '@vueuse/head'
useHead({
  title: 'メインページ'
})
</script>

<template>
  <main>
    <h3>ホーム</h3>
    <div><RealTimeClock /></div>
    <div><UserStatus /></div>
  </main>
</template>
