<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';



interface AttedanceData {
  name: string
}

const attendanceData = ref([] as AttedanceData[])

const fetchAttendantClass = async () => {
  try {
    const response = await axios.get('http://localhost:4242/attendance')
    attendanceData.value = response.data.allAttendantClass
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
    fetchAttendantClass()
})

</script>

<template>
    <p>ここに表示</p>
<div>
    <ul>
        <li v-for="data in attendanceData" :key="data.name">{{ data.name }}</li>
    </ul>
</div>
</template>