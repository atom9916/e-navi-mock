<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

interface AttedanceData {
  name: string
}

const attendanceData = ref([] as AttedanceData[])

const fetchAttendantClass = async () => {
  try {
    const response = await axios.get('http://localhost:4242/attendance')
    attendanceData.value = response.data.allAttendantClass
    console.log('項目', response.data)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchAttendantClass()
})

const defaultAttendantStatus = ref('')
</script>

<template>
  <p>後で消す</p>
  <div>
    <select v-model="defaultAttendantStatus">
      <option v-for="data in attendanceData" :key="data.name">{{ data.name }}</option>
    </select>
  </div>
</template>
