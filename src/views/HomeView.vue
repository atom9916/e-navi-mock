<script setup lang="ts">
import HomeTable from '@/components/HomeTable.vue'
import { useHead } from '@vueuse/head'
useHead({
  title: 'メインページ'
})
</script>

<template>
  <main>
    <HomeTable />
  </main>
  <img src="image/greet.png" alt="今日も1日がんばりましょう" />
</template>

<style scoped>
main {
  margin-top: 100px;
}

img {
  position: fixed;
  top: 55%;
  width: 25%;
  height: auto;
}
</style>
