<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { useUserInfoStore } from '@/stores/userInfo'
import ComponentButton from './ComponentButton.vue'


// 型定義
// DynamoDBでは型情報も含んだオブジェクトとして取得
interface DailyAttendanceData {
  userId: { S: string }
  date: { S: Date }
  state: { S: string }
  shift:{ S: string }
  attendance: { S: string }
  punch_in: { S: string }
  punch_out: { S: string }
  break_time: { S: string }
  work_hour: { N: number }
  overtime: { N: number }
  midnight: { S: string }
  midnightOvertime: { S: string }
  timePaidHoliday: { N: number }
  lateOrEarlyLeave: { N: number }
  tardiness: { S: string }
  comment: { S: string }
}

// DBデータ初期化
const dailyAttendanceData = ref([] as DailyAttendanceData[])

// user_id取得
const userInfoStore = useUserInfoStore() 
const id = userInfoStore.userInfo?.user_id


// 非同期処理
const fetchDailyAttendanceData = async () => {
  const url = import.meta.env.VITE_AWS_API_URL
  try {
    const response = await axios.get(`${url}/daily?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_AWS_API_KEY
    }
  })
    dailyAttendanceData.value = response.data.Items
    console.log('現ユーザーiD',id)
    console.log('現ユーザーの勤怠情報',response.data.Items)
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
    const dataDate = new Date(data.date.S)
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

// 平日or土日
const formatPatternOfWeekday = (dateString) =>{
  const date = new Date(dateString)
  const dayOfWeek = date.getDay()
  if(dayOfWeek === 0 || dayOfWeek === 1){
    return('土日')
  }else{
    return('平日')
  }
}

// 土日の彩り
const getColorStyle = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return 'weekend'; 
    } else {
      return 'weekday'; 
    }
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
    <ComponentButton buttonText="勤怠データを取得" type="submit"/>
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
        <td :class="getColorStyle(date)">{{ formatPatternOfWeekday(date) }}</td>
        <td>{{ filterDataByDate(date)[0]?.state.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.shift.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.attendance.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.punch_in.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.punch_out.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.break_time.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.work_hour.N }}</td>
        <td>{{ filterDataByDate(date)[0]?.overtime.N }}</td>
        <td>{{ filterDataByDate(date)[0]?.midnight.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.midnightOvertime.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.timePaidHoliday.N }}</td>
        <td>{{ filterDataByDate(date)[0]?.lateOrEarlyLeave.N }}</td>
        <td>{{ filterDataByDate(date)[0]?.tardiness.S }}</td>
        <td>{{ filterDataByDate(date)[0]?.comment.S }}</td>
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

.monthlyAttendance th {
  background-color: rgb(92, 247, 175);
}

.weekend {
  background-color: rgb(254, 228, 228);
}

.weekday{
background-color: rgb(236, 247, 248);
}

</style>
