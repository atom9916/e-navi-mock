<template>
  <CalenderTable />
  <br />
  <getPaidOff />
  <br />
  <form @submit="submitForm">
    <p>日付:{{ selectedDate ? selectedDate.toFormat('D') : '日付を選択してください' }}</p>
    <label>出欠:</label>
    <select v-model="defaultAttendantStatus">
      <option
        :value="attendantStatus.name"
        :key="attendantStatus.name"
        v-for="attendantStatus in attendantStatuses"
      >
        {{ attendantStatus.name }}
      </option>
    </select>
    <br />
    <label>状態:</label>
    <br />
    <label>シフト:</label>
    <select v-model="defaultShift">
      <option :value="shift.name" :key="shift.name" v-for="shift in shifts">
        {{ shift.name }}
      </option>
    </select>
    <br />
    <label>就業開始時間:</label>
    <select v-model="startHour">
      <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option></select
    >時
    <select v-model="startMinute">
      <option :value="minute" :key="minute" v-for="minute in minutes">{{ minute }}</option></select
    >分
    <br />
    <label>就業終了時間:</label>
    <select v-model="endHour">
      <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option></select
    >時
    <select v-model="endMinute">
      <option :value="minute" :key="minute" v-for="minute in minutes">{{ minute }}</option></select
    >分
    <br />
    <label>時有給:</label>
    <select v-model="timePaidHoliday">
      <option
        :value="timePaidHoliday"
        :key="timePaidHoliday"
        v-for="timePaidHoliday in timePaidHolidays"
      >
        {{ timePaidHoliday }}
      </option></select
    >時間
    <br />
    <label>休憩時間:</label>
    <select v-model="restHour">
      <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option></select
    >時
    <select v-model="restMinute">
      <option :value="minute" :key="minute" v-for="minute in minutes">{{ minute }}</option></select
    >分
    <br />
    <label>遅刻理由:</label>
    <select v-model="defaultTardinessStatus">
      <option
        :value="tardinessStatus.name"
        :key="tardinessStatus.name"
        v-for="tardinessStatus in tardinessStatuses"
      >
        {{ tardinessStatus.name }}
      </option>
    </select>
    <br />
    <label>コメント:</label>
    <textarea name="comment" v-model="comment" cols="30" rows="1" />
    <br />
    <div>
      <p>勤務時間合計:{{ totalWorkHours }}</p>
    </div>
    <ComponentButton
      buttonText="承認依頼"
      type="submit"
      @click="$router.push({ path: '/daily/attendanceRegistration/attendanceCompleted' })"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import CalenderTable from '../components/CalenderTable.vue'
import { useStoreSelectedDate } from '../stores/selectedDate'
import { useUserInfoStore } from '@/stores/userInfo'
import { DateTime } from 'luxon'
import getPaidOff from './getPaidOff.vue'
import ComponentButton from './atoms/ComponentButton.vue'

// 初期値勤務時間
const startHour = ref('09')
const startMinute = ref('00')
const endHour = ref('18')
const endMinute = ref('00')
const restHour = ref('01')
const restMinute = ref('00')

// 初期値コメント
const comment = ref('')

// 初期値時有給ポ
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
const selectedDate = ref(store.selectedDate ? DateTime.fromJSDate(store.selectedDate) : null)
const updateSelectedDate = (date) => {
  selectedDate.value = DateTime.fromJSDate(date)
}
store.setSelectedDate = updateSelectedDate

// 非同期通信(ポスト)
const submitForm = async (event) => {
  event.preventDefault()

  const startMinuteForCalculation = Number(startMinute.value) / 60
  const endMinuteForCalculation = Number(endMinute.value) / 60
  const restMinuteForCalculation = Number(restMinute.value) / 60

  const formData = {
    userId: userId,
    date: selectedDate.value,
    state: '依頼中',
    shift: defaultShift.value,
    attendance: defaultAttendantStatus.value,
    punch_in: `${startHour.value}:${startMinute.value}`,
    punch_out: `${endHour.value}:${endMinute.value}`,
    break_time: `${restHour.value}:${restMinute.value}`,
    work_hour:
      Number(endHour.value) +
      endMinuteForCalculation +
      Number(timePaidHoliday.value) -
      (Number(restHour.value) + restMinuteForCalculation) -
      (Number(startHour.value) + startMinuteForCalculation),
    overtime:
      Number(endHour.value) +
      endMinuteForCalculation +
      Number(timePaidHoliday.value) -
      (Number(restHour.value) + restMinuteForCalculation) -
      (Number(startHour.value) + startMinuteForCalculation) -
      8,
    midnight: '00:00',
    midnightOvertime: '00:00',
    timePaidHoliday: Number(timePaidHoliday.value),
    lateOrEarlyLeave:
      8 -
      (Number(endHour.value) +
        endMinuteForCalculation -
        (Number(restHour.value) + restMinuteForCalculation) -
        (Number(startHour.value) + startMinuteForCalculation)),
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
    console.log('現在有給内訳', response.data)
    console.log('使用予定有給', paidOff.used_amount + 1)
    console.log('残予定有給', paidOff.remaining_amount - 1)

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
