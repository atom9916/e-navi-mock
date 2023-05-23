<script setup lang="ts">
import { useHead } from '@vueuse/head'
import TimeEntryForm from '../components/TimeEntryForm.vue'
import AttendantStatus from '@/components/AttendantStatus.vue'
import TardinessStatus from '@/components/TardinessStatus.vue'
import { inject } from 'vue'
import axios from 'axios'

useHead({
  title: '日次勤怠'
})

// 型定義
interface TardinessStatusData {
  defaultTardinessStatus: string
}

interface AttendantStatusData {
  defaultAttendantStatus: string
}

interface TimeEntryData {
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
  restHour: number
  restMinute: number
  totalWorkHours: number
}

// 各コンポーネント間からデータ取得

const tardinessStatusData = inject<TardinessStatusData>('tardinessStatusData', {
  defaultTardinessStatus: ''
})
const attendantStatusData = inject<AttendantStatusData>('attendantStatusData', {
  defaultAttendantStatus: ''
})

const timeEntryData = inject<TimeEntryData>('timeEntryData', {
  startHour: 0,
  startMinute: 0,
  endHour: 0,
  endMinute: 0,
  restHour: 0,
  restMinute: 0,
  totalWorkHours: 0
})

const formData = { tardinessStatusData, attendantStatusData, timeEntryData }

const handleSubmit = async () => {
  try {
    const response = await axios.post('/daily_attendance', formData)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <h2>日次勤怠</h2>
  <AttendantStatus />
  <br />
  <TimeEntryForm />
  <TardinessStatus />
  <br />
  <div>
    <button @click="$router.push({ path: '/dayly/attendanceRegistration' }),handleSubmit">登録する</button>
  </div>
</template>
