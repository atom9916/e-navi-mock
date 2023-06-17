<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ComponentButton from './atoms/ComponentButton.vue';
import { useClockIn } from '../stores/clockIn'
import { useClockOut } from '../stores/clockOut'

const currentDate = ref('')
const currentTime = ref('')
const storeClockIn = useClockIn()
const storeClockOut = useClockOut()

const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString()
  currentTime.value = now.toLocaleTimeString()
}

const saveClockIn = () => {
  const now = new Date()
  const dateString = now.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit' })
  storeClockIn.clockIn = dateString
  console.log('出勤時刻',dateString)
  alert(`出勤時間(${dateString})を登録しました`)
}

const saveClockOut = () => {
  const now = new Date()
  const dateString = now.toLocaleTimeString(undefined,{hour: '2-digit', minute: '2-digit' })
  storeClockOut.clockOut = dateString
  console.log('退勤時刻',dateString)
  alert(`退勤時間(${dateString})を登録しました`)
}


onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
})
</script>

<template>
  <table>
    <th>現在時刻</th>
    <tr>
      <td>
        {{ currentDate }}
      </td>
    </tr>
    <tr>
      <td>
        {{ currentTime }}
      </td>
    </tr>
  </table> 
  <ComponentButton buttonText="出勤" @click="saveClockIn"/>
  <ComponentButton buttonText="退勤" @click="saveClockOut"/>
  
</template>

<style scoped>
table {
  margin: 0 auto;
  width: 60%;
  font-size: 18px;
  border: 2px solid #1b5e20;
  text-align: center;
  border-collapse: collapse;
}

th {
  border: 2px solid #1b5e20;
  background-color: #1b5e20;
  color: #f7eccf;
}

tr {
  font-size: 22px;
  border: 1px solid #1b5e20;
  background-color: #f7eccf;
}
</style>
