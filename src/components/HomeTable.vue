<template>
  <div>
    <getPaidOff />
    <RealTimeClock />
    <sampleClockInout/>
  </div>
</template>

<script setup lang="ts">
import getPaidOff from './getPaidOff.vue'
import RealTimeClock from './realTimeClock.vue'
import sampleClockInout from './sampleClockInout.vue';
</script>

<style scoped>
div {
  margin: 0 auto;
  width: 50%;
}
</style>
