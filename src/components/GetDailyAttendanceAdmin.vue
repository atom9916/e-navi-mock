<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

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
  isEditing: { B: boolean }
}

// DBデータ初期化
const dailyAttendanceData = ref([] as DailyAttendanceData[])

// ユーザーID関連

const defaultUser = ref('')
const id = ref('')

const users = [
  { name: '楽須太郎', userId: 'onGE8VNwcFSUj6JB64rK83J5SEA3' },
  { name: '総務太郎', userId: 'j4Rew73n6zSKE9r4xeZVR37zL2h2' },
  { name: '総務次郎', userId: 'iJ0AsA1wKheniH4v2Wea93f9JL33' },
  { name: '総務三郎', userId: 'TOJ49p6hdwbA6fDxBeI0AfHMGhg2' }
]

function getUserNameById(userId: string): string {
  const user = users.find((user) => user.userId === userId)
  return user ? user.name : ''
}

// 非同期処理
const fetchDailyAttendanceData = async () => {
  const url = import.meta.env.VITE_AWS_API_URL
  try {
    const response = await axios.get(`${url}/daily?id=${id.value}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
    })
    const newArray = response.data.Items
    const newArrayAddIsEditing = newArray.map((obj) => ({ ...obj, isEditing: { B: false } }))
    dailyAttendanceData.value = newArrayAddIsEditing

    console.log('現ユーザーiD', id)
    console.log('現ユーザーの勤怠情報', newArrayAddIsEditing)
  } catch (error) {
    console.error(error)
  }
}

const handleUserSelection = (event) => {
  id.value = event.target.value
  fetchDailyAttendanceData()
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
  const weekday = (date.getDay() + 6) % 7
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'] // 曜日の配列
  return `(${weekdays[weekday]})`
}
const formatPatternOfWeekday = (dateString) =>{
  const date = new Date(dateString)
  const dayOfWeek = date.getDay()
  if(dayOfWeek === 0 || dayOfWeek === 6){
    return('土日')
  }else{
    return('平日')
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

// 編集用
// const editFormData = ref({} as DailyAttendanceData)

// const handleEditClick = (date) => {
//   const data = filterDataByDate(date)[0]
//   if (data) {
//     data.isEditing = { B: true }
//     editFormData.value = { ...data }
//   }
// }

// const updateAttendanceData = async (date) => {
//   const data = filterDataByDate(date)[0]

//   if (data) {
//     const url = import.meta.env.VITE_AWS_API_URL
//     try {
//       const response = await axios.put(`${url}/daily?id=${id.value}`, data, {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': import.meta.env.VITE_AWS_API_KEY
//         }
//       })
//       console.log('データが更新されました', response.data)
//     } catch (error) {
//       console.error('データの更新に失敗しました', error)
//     }
//   }
// }
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
  <br />
  <label>ユーザー選択:</label>
  <select v-model="defaultUser" @change="handleUserSelection">
    <option :value="user.userId" :key="user.userId" v-for="user in users">
      {{ user.userId }}
    </option>
  </select>
  <p>名前:{{ getUserNameById(defaultUser) }}</p>
  <br />
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
          <!-- <th></th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="date in dailyAttendanceDates" :key="date">
          <td>{{ date }}</td>
          <td>{{ formatWeekday(date) }}</td>
          <td>{{ formatPatternOfWeekday(date) }}</td>
          <td>{{ filterDataByDate(date)[0]?.shift.S }}</td>
          <!-- <td v-if="filterDataByDate(date)[0].isEditing = {B:false}">
            {{ filterDataByDate(date)[0]?.state.S }}
          </td>
          <td v-else>
            <form @submit.prevent="updateAttendanceData(date)">
              <input v-model="editFormData.state" />
              <br />
              <button type="submit">保存</button>
              <span>&nbsp;</span>
              <button @click="filterDataByDate(date)[0].isEditing = { B: false }">
                キャンセル
              </button>
            </form>
          </td> -->
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
          <!-- <td>
            <div>
              <button v-if="!filterDataByDate(date)[0]?.isEditing" @click="handleEditClick">編集</button>
              <button v-else @click="filterDataByDate(date)[0].isEditing = { B: false }">編集中</button>
            </div>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.monthlyAttendance table {
  border-collapse: collapse;
}

.monthlyAttendance th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
</style>
