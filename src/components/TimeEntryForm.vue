<template>
  <form @submit="submitForm">
    <p>
      ● 日付：{{
        selectedDate
          ? DateTime.fromFormat(selectedDate, 'yyyy-MM-dd').toFormat('M/d')
          : '日付を選択してください'
      }}
    </p>

    <label for="attendance">● 出欠：</label>
    <select id="attendance" v-model="defaultAttendantStatus">
      <option
        :value="attendantStatus.name"
        :key="attendantStatus.name"
        v-for="attendantStatus in attendantStatuses"
      >
        {{ attendantStatus.name }}
      </option>
    </select>

    <p>● 状態：</p>
    <!-- <p>状態:{{ filteredSubmittedDailyAttendanceData }}</p> -->

    <p>
      <label for="shift">● シフト：</label>
      <select id="shift" v-model="defaultShift">
        <option :value="shift.name" :key="shift.name" v-for="shift in shifts">
          {{ shift.name }}
        </option>
      </select>
    </p>

    <p>
      <label>● 就業開始時間：</label>
      <select v-model="startHour">
        <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option></select
      >時
      <select v-model="startMinute">
        <option :value="minute" :key="minute" v-for="minute in minutes">
          {{ minute }}
        </option></select
      >分
    </p>

    <p>
      <label>● 就業終了時間：</label>
      <select v-model="endHour">
        <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option></select
      >時
      <select v-model="endMinute">
        <option :value="minute" :key="minute" v-for="minute in minutes">
          {{ minute }}
        </option></select
      >分
    </p>

    <p>
      <label>● 時有給：</label>
      <select v-model="timePaidHoliday">
        <option
          :value="timePaidHoliday"
          :key="timePaidHoliday"
          v-for="timePaidHoliday in timePaidHolidays"
        >
          {{ timePaidHoliday }}
        </option></select
      >時間
    </p>

    <p>
      <label>● 休憩時間：</label>
      <select v-model="restHour">
        <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option></select
      >時
      <select v-model="restMinute">
        <option :value="minute" :key="minute" v-for="minute in minutes">
          {{ minute }}
        </option></select
      >分
    </p>

    <p>
      <label>● 遅刻理由：</label>
      <select v-model="defaultTardinessStatus">
        <option
          :value="tardinessStatus.name"
          :key="tardinessStatus.name"
          v-for="tardinessStatus in tardinessStatuses"
        >
          {{ tardinessStatus.name }}
        </option>
      </select>
    </p>

    <p>
      <label>● コメント： </label>
      <textarea name="comment" v-model="comment" cols="30" rows="1" />
    </p>

    <p>● 勤務時間合計： {{ totalWorkHours }}</p>
    <ComponentButton buttonText="承認依頼" type="submit" />
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { useStoreSelectedDate } from '../stores/selectedDate'
import { useUserInfoStore } from '@/stores/userInfo'
import { DateTime } from 'luxon'
import ComponentButton from './atoms/ComponentButton.vue'
import { useRouter } from 'vue-router'
import type { DailyAttendanceData } from '@/types/dailyAttendanceData.type.ts'

const router = useRouter()

// 初期値勤務時間
const startHour = ref('09')
const startMinute = ref('00')
const endHour = ref('18')
const endMinute = ref('00')
const restHour = ref('01')
const restMinute = ref('00')

// 初期値コメント
const comment = ref('')

// 初期値時有給
const timePaidHoliday = ref('0')

// 初期値遅刻理由
const defaultTardinessStatus = ref('なし')

// 初期値出欠
const defaultAttendantStatus = ref('出勤')

// 初期値シフト
const defaultShift = ref('一日社内業務')

// ドロップダウンリストの選択肢(出欠)
interface AttedanceData {
  name: string
}
const attendantStatuses = ref([] as AttedanceData[])
const fetchAttendanceData = async () => {
  try {
    const response = await axios.get('http://localhost:4242/attendance')
    attendantStatuses.value = response.data.allAttendanceData
    console.log('出欠項目', response.data.allAttendanceData)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchAttendanceData()
})

// ドロップダウンリストの選択肢(遅刻理由)
interface TardinessData {
  name: string
}

const tardinessStatuses = ref([] as TardinessData[])

const fetchTardinessData = async () => {
  try {
    const response = await axios.get('http://localhost:4242/tardiness')
    tardinessStatuses.value = response.data.allTardinessData
    console.log('遅刻項目', response.data.allTardinessData)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchTardinessData()
})

// ドロップダウンリストの選択肢(シフト)
interface Shift {
  name: string
}

const shifts = ref([] as Shift[])

const fetchShiftData = async () => {
  try {
    const response = await axios.get('http://localhost:4242/shift')
    shifts.value = response.data.allShiftData
    console.log('シフト項目', response.data.allShiftData)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchShiftData()
})

// ドロップダウンリストの選択肢(数字)
const hours = Array.from({ length: 48 }, (_, index) => String(index).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'))
const timePaidHolidays = Array.from({ length: 9 }, (_, index) => String(index).padStart(1))

// 勤務合計時間の規定

let totalWorkHours = '8時間0分'

watch([startHour, startMinute, endHour, endMinute, restHour, restMinute, timePaidHoliday], () => {
  const start = Number(startHour.value) * 60 + Number(startMinute.value)
  const end = Number(endHour.value) * 60 + Number(endMinute.value)
  const rest = Number(restHour.value) * 60 + Number(restMinute.value)
  const time = Number(timePaidHoliday.value) * 60

  if (start && end && end >= start) {
    const diff = end + time - (rest + start)

    const hours = Math.floor(diff / 60)
    const minutes = diff % 60

    totalWorkHours = `${hours}時間 ${minutes}分`
  } else {
    totalWorkHours = ''
  }
})

// ユーザー情報をストアから取得
const userInfoStore = useUserInfoStore()
const userId = userInfoStore.userInfo?.user_id

//カレンダーから日付を取得
const store = useStoreSelectedDate()
const selectedDate = ref(
  store.selectedDate ? DateTime.fromJSDate(store.selectedDate).toFormat('yyyy-MM-dd') : null
)
const updateSelectedDate = (date) => {
  selectedDate.value = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
}
store.setSelectedDate = updateSelectedDate

// 状態を取得or未入
const submittedDailyAttendanceData = ref([] as DailyAttendanceData[])

const fetchSubmittedDailyAttendanceData = async () => {
  const url = import.meta.env.VITE_AWS_API_URL
  try {
    const response = await axios.get(`${url}/daily?id=${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
    })
    submittedDailyAttendanceData.value = response.data.Items

    console.log(`登録済の勤怠情報`, response.data.Items)
    console.log(filteredSubmittedDailyAttendanceData.value)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSubmittedDailyAttendanceData()
})

const filteredSubmittedDailyAttendanceData = ref([])

watch(
  [selectedDate, submittedDailyAttendanceData],
  ([newSelectedDate, newSubmittedDailyAttendanceData]) => {
    const filterByDate = (data, date) => {
      return data.filter((item) => (item.date = date))
    }
    filteredSubmittedDailyAttendanceData.value = filterByDate(
      newSubmittedDailyAttendanceData,
      newSelectedDate
    )
  }
)

// const filterDataByDate = (date) => {
//   return submittedDailyAttendanceData.value.filter((data) => {
//     const dataDate = new Date(data.date.S)
//     dataDate === date
//   })
// }

// const submittedState = filterDataByDate(selectedDate.value)[0]?.state.S || '未入力'

// 非同期通信(ポスト)
const submitForm = async (event) => {
  event.preventDefault()

  const startMinuteForCalculation = Number(startMinute.value) / 60
  const endMinuteForCalculation = Number(endMinute.value) / 60
  const restMinuteForCalculation = Number(restMinute.value) / 60

  //勤務時間を08:00と表示させるときに後で使いたい 
  let totalMinutes = (Number(endHour.value)*60 + endMinuteForCalculation) +
                     Number(timePaidHoliday.value)*60 -
                     (Number(restHour.value)*60 + restMinuteForCalculation) -
                     (Number(startHour.value)*60 + startMinuteForCalculation)
  
  let workHour = Math.floor(totalMinutes / 60).toString().padStart(2, '0');
  let workMinute = (totalMinutes % 60).toString().padStart(2, '0');

  let workHourResult = workHour + ':' + workMinute



  let overtime = Number(endHour.value) +
                 endMinuteForCalculation +
                 Number(timePaidHoliday.value) -
                 (Number(restHour.value) + restMinuteForCalculation) -
                 (Number(startHour.value) + startMinuteForCalculation) - 8

   //残業を00:00と表示させるときに後で使いたい 
  let totalMinutesOfovertime = (Number(endHour.value)*60 + endMinuteForCalculation) +
                                Number(timePaidHoliday.value)*60 -
                               (Number(restHour.value)*60 + restMinuteForCalculation) -
                               (Number(startHour.value)*60 + startMinuteForCalculation) - 480
  
  let overtimeHour = Math.floor(totalMinutesOfovertime / 60).toString().padStart(2, '0');
  let overtimeMinute = (totalMinutesOfovertime % 60).toString().padStart(2, '0');

  let overtimeResult = overtimeHour + ':' + overtimeMinute



  let lateOrEarlyLeave = 8 -
      (Number(endHour.value) +
      endMinuteForCalculation -
      (Number(restHour.value) + restMinuteForCalculation) -
      (Number(startHour.value) + startMinuteForCalculation))


// 時有給を00:00と表示させるときに後で使いたい
let totalMinutesOfTimePaidHoliday = Number(timePaidHoliday.value)*60 
let timePaidHolidayHour = Math.floor(totalMinutesOfTimePaidHoliday / 60).toString().padStart(2, '0');
let timePaidHolidayResult = timePaidHolidayHour + ':00'



// 遅刻早退を00:00と表示させるときに後で使いたい 
let totalMinutesOfLateOrEarlyLeave = 480 - (Number(endHour.value)*60 + endMinuteForCalculation) +
                     Number(timePaidHoliday.value)*60 -
                     (Number(restHour.value)*60 + restMinuteForCalculation) -
                     (Number(startHour.value)*60 + startMinuteForCalculation)
  
  let lateOrEarlyLeaveHour = Math.floor(totalMinutesOfLateOrEarlyLeave / 60).toString().padStart(2, '0');
  let lateOrEarlyLeaveMinute = (totalMinutesOfLateOrEarlyLeave % 60).toString().padStart(2, '0');

  let lateOrEarlyLeaveResult = lateOrEarlyLeaveHour + ':' + lateOrEarlyLeaveMinute



  const formData = {
    userId: userId,
    date: selectedDate.value,
    state: '依頼中',
    shift: defaultShift.value,
    attendance: defaultAttendantStatus.value,
    punch_in: `${startHour.value}:${startMinute.value}`,
    punch_out: `${endHour.value}:${endMinute.value}`,
    break_time: `${restHour.value}:${restMinute.value}`,
    work_hour:workHour,
    overtime:overtime,
    midnight: '00:00',
    midnightOvertime: '00:00',
    timePaidHoliday: Number(timePaidHoliday.value),
    lateOrEarlyLeave:lateOrEarlyLeave,
    tardiness: defaultTardinessStatus.value,
    comment: comment.value
  }
  try {
    const url = import.meta.env.VITE_AWS_API_URL
    const responseDynamo = await axios.post(`${url}/daily`, formData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
    })
    router.push({ path: '/daily/attendanceRegistration/attendanceCompleted' })
    if (responseDynamo.status === 200) {
      console.log('勤怠データが保存されました')
    } else {
      console.error('勤怠データは保存出来ていません')
    }
  } catch (error) {
    console.error('エラーが発生しました', error)
  }

  //有給を消費する
  if (defaultAttendantStatus.value !== '有給') {
    return
  }
  try {
    const response = await axios.get(`http://localhost:4242/paidOff/${userId}`)
    const paidOff = response.data.paidOff
    console.log('現在有給内訳', response.data.paidOff)
    console.log('使用済有給(予定)', paidOff.used_amount + 1)
    console.log('残有給(予定)', paidOff.remaining_amount - 1)

    if (paidOff.remaining_amount >= 0) {
      const usedAmount = paidOff.used_amount + 1
      const remainingAmount = paidOff.remaining_amount - 1
      await axios.put(`http://localhost:4242/paidOff/${userId}`, {
        used_amount: usedAmount,
        remaining_amount: remainingAmount
      })
      console.log(`有給を使用しました`)
    } else {
      console.error('有給取得でエラーが発生しました')
    }
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
form {
  width: 30%;
  margin: 50px 0;
  border: 2px solid #1b5e20;
  padding: 5px 30px;
  border-radius: 5px;
  background-color: #f7eccf;
}
</style>
