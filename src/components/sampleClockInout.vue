<script setup lang="ts">
import { useClockIn } from '../stores/clockIn'
import { useClockOut } from '../stores/clockOut'
import { ref } from 'vue';

//ストアから出退勤時間を取得
const storeClockIn = useClockIn()
const storeClockOut = useClockOut()


const clockIn = ref(
  storeClockIn.clockIn ? storeClockIn.clockIn : null
)
const updateClockIn = ( ) => {
    clockIn.value = storeClockIn.clockIn
}
storeClockIn.setClockIn = updateClockIn


const clockOut = ref(
  storeClockOut.clockOut ? storeClockOut.clockOut : null
)
const updateClockOut = ( ) => {
    clockOut.value = storeClockOut.clockOut
}
storeClockOut.setClockOut = updateClockOut


const clockInHours = String(clockIn.value?.getHours())
const clockInMinutes = String(clockIn.value?.getMinutes())

const clockOutHours = String(clockOut.value?.getHours())
const clockOutMinutes = String(clockOut.value?.getMinutes())


</script>

<template>
    <p>出勤時:{{ clockInHours }}</p>
    <p>出勤分:{{ clockInMinutes }}</p>
    <p>退勤:{{ clockOutHours }}</p>
    <p>退勤分:{{ clockOutMinutes }}</p>

</template>