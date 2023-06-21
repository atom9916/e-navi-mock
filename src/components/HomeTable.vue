<template>
  <div>
    <span v-if="userInfoStore.userInfo?.admin">
      <NotificationToAdmin />
    </span>
    <!-- <getPaidOff /> -->
    <!-- ↑についてログイン時にid取得より前に非同期処理をしてしまうのでエラーがでます。解消できるまで、いったん非表示にします -->
    <RealTimeClock />
    <ClockInoutAndSubmit />
  </div>
</template>

<script setup lang="ts">
// import getPaidOff from './getPaidOff.vue'
import RealTimeClock from './realTimeClock.vue'
import ClockInoutAndSubmit from './ClockInoutAndSubmit.vue'
import NotificationToAdmin from './sampleMessage.vue'
import { useUserInfoStore } from '../stores/userInfo'

const userInfoStore = useUserInfoStore()
</script>

<style scoped>
div {
  margin: 0 auto;
  width: 50%;
}
</style>
