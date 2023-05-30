<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface DailyAttendanceData{
    userId: string,
    date:Date,
    state: string,
    attendance: string,
    punch_in: string,
    punch_out: string,
    break_time: string,
    work_hour:number,
    tardiness: string,
    comment: string
}

 const dailyAttendanceData = ref([] as DailyAttendanceData[])

const fetchDailyAttendanceData = async () =>{
  try{
    const response = await axios.get('http://localhost:4242/day')
    dailyAttendanceData.value = response.data.allDailyWorkData
    console.log(response.data)
  } catch (error){
    console.error(error)
  }
}

onMounted(()=>{
  fetchDailyAttendanceData()
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
}
</script>
<template>
    <button @click="fetchDailyAttendanceData">確認</button>
    <table>
      <thead>
        <tr>
          <th>日時</th>
          <th>曜日</th>
          <th>種別</th>
          <th>状態</th>
          <th>シフト</th>
          <th>出欠</th>
          <th>開始</th>
          <th>終了</th>
          <th>休憩</th>
          <th>基本</th>
          <th>残業</th>
          <th>深夜</th>
          <th>深夜残</th>
          <th>時有給</th>
          <th>終了</th>
          <th>遅早</th>
          <th>理由</th>
          <th>コメント</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="data in dailyAttendanceData" :key="data.userId">
          <td>{{ formatDate(data.date) }}</td>
         <td></td> 
          <td></td>
          <td></td>
          <td></td>
          <td>{{ data.attendance }}</td>
          <td>{{ data.punch_in }}</td>
          <td>{{ data.punch_out }}</td>
          <td>{{ data.break_time }}</td>
          <td>{{ data.work_hour }}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ data.tardiness }}</td>
          <td>{{ data.comment }}</td>
        </tr>
      </tbody>
    </table>
</template>