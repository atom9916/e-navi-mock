<template>
  <CalenderTable />
  <br />
  <form @submit="submitForm">
    <p>日付:{{ selectedDate ? selectedDate.toFormat('D') : '日付を選択してください' }}</p>
    <label>出欠:</label>
    <select v-model="defaultAttendantStatus">
      <option :value="attendantStatus" :key="attendantStatus" v-for="attendantStatus in attendantStatuses">{{ attendantStatus }}</option>
    </select>
    <br />
    <label>状態:ここに表示(未入力・登録済・依頼中)</label>
    <br/>
    <label>シフト:</label>
    <select v-model="defaultShift">
      <option :value="shift" :key="shift" v-for="shift in shifts">{{ shift }}</option>
    </select>
    <br>
    <label>就業開始時間:</label>
    <select v-model="startHour">
      <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option>
    </select>時
    <select v-model="startMinute">
      <option :value="minute" :key="minute" v-for="minute in minutes">{{ minute }}</option>
    </select>分
    <br />
    <label>就業終了時間:</label>
    <select v-model="endHour">
      <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option>
    </select>時
    <select v-model="endMinute">
      <option :value="minute" :key="minute" v-for="minute in minutes">{{ minute }}</option>
    </select>分
    <br />
    <label>時有給:</label>
    <select v-model="timePaidHoliday">
      <option :value="timePaidHoliday" :key="timePaidHoliday" v-for="timePaidHoliday in timePaidHolidays">{{ timePaidHoliday }}</option>
    </select>時間
    <br>
    <label>休憩時間:</label>
    <select v-model="restHour">
      <option :value="hour" :key="hour" v-for="hour in hours">{{ hour }}</option>
    </select>時
    <select v-model="restMinute">
      <option :value="minute" :key="minute" v-for="minute in minutes">{{ minute }}</option>
    </select>分
    <br />
    <label>遅刻理由:</label>
    <select v-model="defaultTardinessStatus">
      <option :value="tardinessStatus" :key="tardinessStatus" v-for="tardinessStatus in tardinessStatuses">{{ tardinessStatus }}</option>
    </select>
    <br />
    <label>コメント:</label>
    <textarea name="comment" v-model="comment" cols="30" rows="1" />
    <br />
    <div>
      <p>勤務時間合計:{{ totalWorkHours }}</p>
    </div>
    <button type="submit">承認依頼</button>
    <!-- <button>登録</button> -->
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import CalenderTable from '../components/CalenderTable.vue'
import { useStoreSelectedDate } from '../stores/selectedDate'
import { useUserInfoStore } from '@/stores/userInfo'
import { DateTime } from 'luxon'

// 初期値勤務時間
const startHour = ref('')
const startMinute = ref('')
const endHour = ref('')
const endMinute = ref('')
const restHour = ref('')
const restMinute = ref('')
const comment = ref('')
const timePaidHoliday = ref('')

// 初期値遅刻理由
const defaultTardinessStatus = ref('')

// 初期値出欠
const defaultAttendantStatus = ref('')

// 初期値シフト
const defaultShift = ref('')

// ドロップダウンリストの選択肢
const hours = Array.from({ length: 48 }, (_, index) => String(index).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'))
const attendantStatuses = ['出勤', '有給', '半休', '慶弔休', '欠勤', '休日出勤']
const tardinessStatuses = ['なし', '電車遅延', '自己都合', 'その他']
const shifts = ['1日社内業務','定時後社内業務','午前社内業務','午後社内業務','オフピーク勤務']
const timePaidHolidays = Array.from({ length: 9 }, (_, index) => String(index).padStart(1))

// 勤務合計時間の規定

let totalWorkHours = ''

watch([startHour, startMinute, endHour, endMinute, restHour, restMinute,timePaidHoliday], () => {
  const start = Number(startHour.value) * 60 + Number(startMinute.value)
  const end = Number(endHour.value) * 60 + Number(endMinute.value)
  const rest = Number(restHour.value) * 60 + Number(restMinute.value)
  const time = Number(timePaidHoliday.value)*60

  if (start && end && end >= start) {
    const diff = (end + time) - (rest + start)

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

// 非同期通信
const submitForm = async (event) => {
  event.preventDefault()

  const startMinuteForCalculation = Number(startMinute.value) / 60
  const endMinuteForCalculation = Number(endMinute.value) / 60
  const restMinuteForCalculation = Number(restMinute.value) / 60

  const formData = {
    userId: userId,
    date: selectedDate.value,
    state: '依頼中',
    shift:defaultShift.value,
    attendance: defaultAttendantStatus.value,
    punch_in: `${startHour.value}:${startMinute.value}`,
    punch_out: `${endHour.value}:${endMinute.value}`,
    break_time: `${restHour.value}:${restMinute.value}`,
    work_hour:
      Number(endHour.value) +
      endMinuteForCalculation +
      Number(timePaidHoliday.value)
      -
      (Number(restHour.value) + restMinuteForCalculation) -
      (Number(startHour.value) + startMinuteForCalculation),
    overtime:
      Number(endHour.value) +
      endMinuteForCalculation +
      Number(timePaidHoliday.value)
      -
      (Number(restHour.value) + restMinuteForCalculation) -
      (Number(startHour.value) + startMinuteForCalculation) -
      8,
      midnight:'00:00',
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
    const response = await axios.post('http://localhost:4242/day', formData)
    if (response.status === 200) {
      console.log('勤怠データが保存されました')
    } else {
      console.error('勤怠データは保存出来ていません')
    }
  } catch (error) {
    console.error('エラーが発生しました', error)
  }
}
</script>
