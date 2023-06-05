<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

// 型定義
interface DailyAttendanceData {
  userId: string
  date: Date
  state: string
  shift:string
  attendance: string
  punch_in: string
  punch_out: string
  break_time: string
  work_hour: number
  overtime:number
  midnight:string
  midnightOvertime:string
  timePaidHoliday:number
  lateOrEarlyLeave:number
  tardiness: string
  comment: string
}

// DBデータ初期化
const dailyAttendanceData = ref([] as DailyAttendanceData[])



// 非同期処理
const fetchDailyAttendanceData = async () => {
  try {
    const response = await axios.get('http://localhost:4242/day')
    dailyAttendanceData.value = response.data.allDailyWorkData
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchDailyAttendanceData()
})

const defaultAttendantStatus = ref('')


</script>

<template>
    <p>【後で消す】getした選択肢</p>
<div>
    <select v-model="defaultAttendantStatus">
        <option v-for="data in dailyAttendanceData" :key="data.comment" >{{ data.comment }}</option>
    </select>
</div>
</template>