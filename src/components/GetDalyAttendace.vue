<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { useUserInfoStore } from '@/stores/userInfo'


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

// user_id取得
const userInfoStore = useUserInfoStore() 
const id = userInfoStore.userInfo?.user_id


// 非同期処理
const fetchDailyAttendanceData = async () => {
  
  try {
    const response = await axios.get(`http://localhost:4242/day/${id}`)
    dailyAttendanceData.value = response.data.dailyWorkDataByUserId
    console.log('こちら！',id)
    console.log('こちらも',response.data.dailyWorkDataByUserId)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchDailyAttendanceData()
})

// フィルター
const filterDataByDate = (date) => {
  return dailyAttendanceData.value.filter((data) => {
    const dataDate = new Date(data.date)
    const formattedDate = formatDate(dataDate)
    return formattedDate === date
  })
}

// dateをm/dの型式で表示
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}/${day}`
}

// 曜日を表示
const formatWeekday = (dateString) => {
  const date = new Date(dateString)
  const weekday = (date.getDay()+6)%7 
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'] // 曜日の配列
  return `(${weekdays[weekday]})`
}

// 年月取得用フォーム規定
const defaultYears = ref(dayjs().year())
const defaultMonths = ref(dayjs().month() + 1)
const years = [2022, 2023, 2024]
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const dailyAttendanceDates = ref([] as string[])

const showTargetMonth = () => {
  // 選択された年月を取得
  const selectedYear = defaultYears.value
  const selectedMonth = defaultMonths.value

  // 対象月の日付を計算
  const startDate = dayjs(`${selectedYear}-${selectedMonth}-01`).startOf('month')
  const endDate = startDate.endOf('month')

  // 日付の配列を作成
  const dates: string[] = []
  let currentDate = startDate
  while (currentDate.isSame(endDate, 'day') || currentDate.isBefore(endDate, 'day')) {
    const formattedDate = formatDate(currentDate)
    dates.push(formattedDate)
    currentDate = currentDate.add(1, 'day')
  }

  // 日付を表示
  dailyAttendanceDates.value = dates

  console.log(dates)
}
</script>
<template>
  <form @submit.prevent="showTargetMonth">
    <label>年:</label>
    <select v-model="defaultYears">
      <option :value="year" :key="year" v-for="year in years">{{ year }}</option>
    </select>
    <label>月:</label>
    <select v-model="defaultMonths">
      <option :value="month" :key="month" v-for="month in months">{{ month }}</option>
    </select>
    <br />
    <button>勤怠データを取得</button>
  </form>

  <br>
  <div class="monthlyAttendance">
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
        <th>遅早</th>
        <th>理由</th>
        <th>コメント</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="date in dailyAttendanceDates" :key="date">
        <td>{{ date }}</td>
        <td>{{ formatWeekday(date) }}</td>
        <td></td>
        <td>{{ filterDataByDate(date)[0]?.state }}</td>
        <td></td>
        <td>{{ filterDataByDate(date)[0]?.attendance }}</td>
        <td>{{ filterDataByDate(date)[0]?.punch_in }}</td>
        <td>{{ filterDataByDate(date)[0]?.punch_out }}</td>
        <td>{{ filterDataByDate(date)[0]?.break_time }}</td>
        <td>{{ filterDataByDate(date)[0]?.work_hour }}</td>
        <td>{{ filterDataByDate(date)[0]?.overtime }}</td>
        <td>{{ filterDataByDate(date)[0]?.midnight }}</td>
        <td>{{ filterDataByDate(date)[0]?.midnightOvertime }}</td>
        <td>{{ filterDataByDate(date)[0]?.timePaidHoliday }}</td>
        <td>{{ filterDataByDate(date)[0]?.lateOrEarlyLeave }}</td>
        <td>{{ filterDataByDate(date)[0]?.tardiness }}</td>
        <td>{{ filterDataByDate(date)[0]?.comment }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>


<style>
.monthlyAttendance table {
  border-collapse: collapse;
}

.monthlyAttendance th,td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
</style>
