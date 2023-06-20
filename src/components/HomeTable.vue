<template>
  <div>
    <!-- <getPaidOff /> -->
    <!-- ↑についてログイン時にid取得より前に非同期処理をしてしまうのでエラーがでます。解消できるまで、いったん非表示にします -->
    <RealTimeClock />
    <ClockInoutAndSubmit/>
  </div>
</template>

<script setup lang="ts">
import getPaidOff from './getPaidOff.vue'
import RealTimeClock from './realTimeClock.vue'
import ClockInoutAndSubmit from './ClockInoutAndSubmit.vue';
</script>

<style scoped>
div {
  margin: 0 auto;
  width: 50%;
}
</style>
