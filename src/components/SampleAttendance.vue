<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'


// 出欠
// interface AttedanceData {
//   name: string
// }

// const attendanceData = ref([] as AttedanceData[])

// const fetchAttendantClass = async () => {
//   try {
//     const response = await axios.get('http://localhost:4242/attendance')
//     attendanceData.value = response.data.allAttendantClass
//     console.log('出欠項目', response.data)
//   } catch (error) {
//     console.error(error)
//   }
// }
// onMounted(() => {
//   fetchAttendantClass()
  
// })

// const defaultAttendantStatus = ref('')


//遅刻理由
// interface TardinessData {
//   name: string
// }

// const tardinessData = ref([] as TardinessData[])

// const fetchTardinessClass = async () => {
//   try {
//     const response = await axios.get('http://localhost:4242/tardiness')
//     tardinessData.value = response.data.allTardinessClass
//     console.log('遅刻項目', response.data)
//   } catch (error) {
//     console.error(error)
//   }
// }
// onMounted(() => {
//   fetchTardinessClass()
// })

// const defaultTardinessStatus = ref('')

// 状態
interface State {
  name: string
}

const stateData = ref([] as State[])

const fetchState = async () => {
  try {
    const response = await axios.get('http://localhost:4242/state')
    stateData.value = response.data.allState
    console.log('状態項目', response.data.allState)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchState()
})

const defaultState = ref('')
</script>

<template>
  <p>後で消す</p>
  <!-- <div>
    <select v-model="defaultAttendantStatus">
      <option v-for="data in attendanceData" :key="data.name">{{ data.name }}</option>
    </select>
  </div>
  <div>
    <select v-model="defaultTardinessStatus">
      <option v-for="data in tardinessData" :key="data.name">{{ data.name }}</option>
    </select>
  </div> -->
  <div>
    <select v-model="defaultState">
      <option v-for="data in stateData" :key="data.name">{{ data.name }}</option>
    </select>
  </div>
</template>
