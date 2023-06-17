<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { useUserInfoStore } from '@/stores/userInfo'
import GetDateComponent from './atoms/GetDateComponent.vue'

// 型定義
// DynamoDBでは型情報も含んだオブジェクトとして取得
interface DailyAttendanceData {
  userId: { S: string }
  date: { S: Date }
  state: { S: string }
  shift: { S: string }
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
    console.log('現ユーザーiD', id)
    console.log('現ユーザーの勤怠情報', response.data.Items)
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
  const year = date.getFullYear()
  return `${year}/${month}/${day}`
}

// 曜日を表示
const formatWeekday = (dateString) => {
  const date = new Date(dateString)
  const weekday = date.getDay()
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'] // 曜日の配列
  return `(${weekdays[weekday]})`
}

// 平日or土日
const formatPatternOfWeekday = (dateString) => {
  const date = new Date(dateString)
  const dayOfWeek = date.getDay()
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return '土日'
  } else {
    return '平日'
  }
}

// 土日の彩り
const getColorStyle = (dateString) => {
  const date = new Date(dateString)
  const dayOfWeek = date.getDay()

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return 'weekend'
  } else {
    return 'weekday'
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
  console.log('選択年', defaultYears.value)
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
  <div class="getDateComponent">
    <GetDateComponent
      :defaultYears="defaultYears"
      :defaultMonths="defaultMonths"
      :years="years"
      :months="months"
      @submit.prevent="showTargetMonth"
      @update:defaultMonths="defaultMonths = $event"
      @update:defaultYears="defaultYears = $event"
    />
  </div>
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
          <td :class="getColorStyle(date)">{{ date }}</td>
          <td :class="getColorStyle(date)">{{ formatWeekday(date) }}</td>
          <td :class="getColorStyle(date)">{{ formatPatternOfWeekday(date) }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.state.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.shift.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.attendance.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.punch_in.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.punch_out.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.break_time.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.work_hour.N }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.overtime.N }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.midnight.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.midnightOvertime.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.timePaidHoliday.N }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.lateOrEarlyLeave.N }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.tardiness.S }}</td>
          <td :class="getColorStyle(date)">{{ filterDataByDate(date)[0]?.comment.S }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 90%;
  margin: 50px auto;
  border-collapse: collapse;
  border: 2px solid #1b5e20;
}

th {
  background-color: #1b5e20;
  font-size: 16px;
  color: #f7eccf;
}

td {
  background-color: #f7eccf;
  border: 1px solid #1b5e20;
  padding: 8px;
  font-size: 14px;
  text-align: center;
}

.getDateComponent {
  width: 40%;
  margin: 0 auto;
}

.weekend {
  background-color: rgb(156, 152, 152);
}
</style>
