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
    console.log('出欠項目', response.data)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchAttendantClass()
  
})

const defaultAttendantStatus = ref('')

//

interface TardinessData {
  name: string
}

const tardinessData = ref([] as TardinessData[])

const fetchTardinessClass = async () => {
  try {
    const response = await axios.get('http://localhost:4242/tardiness')
    tardinessData.value = response.data
    console.log('遅刻項目', response.data)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchTardinessClass()
})

const defaultTardinessStatus = ref('')

</script>

<template>
  <p>後で消す</p>
  <div>
    <select v-model="defaultAttendantStatus">
      <option v-for="data in attendanceData" :key="data.name">{{ data.name }}</option>
    </select>
  </div>
  <ul>
    <li v-for="data in tardinessData" :key="data.name">{{ data.name }}</li>
  </ul>
  <div>
    <select v-model="defaultTardinessStatus">
      <option v-for="data in tardinessData" :key="data.name">{{ data.name }}</option>
    </select>
  </div>
</template>
