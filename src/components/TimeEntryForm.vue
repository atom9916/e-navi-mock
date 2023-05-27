<template>
  <CalenderTable />
  <br />
  <p>日付:{{ selectedDate }}</p>
  <p>ID:{{ userId }}</p>
  <br />
  <form @submit="submitForm">
    <label>出欠:</label>
    <div class="dropdown">
      <input
        type="text"
        v-model="defaultAttendantStatus"
        @click="showAttendantStatusOptions = true"
      />
      <ul v-show="showAttendantStatusOptions" class="dropdown-menu">
        <li
          v-for="attendantStatus in attendantStatuses"
          :key="attendantStatus"
          @click="selectAttendantStatus(attendantStatus)"
        >
          {{ attendantStatus }}
        </li>
      </ul>
    </div>
    <br />
    <label>就業開始時間:</label>
    <div class="dropdown">
      <input type="text" v-model="startHour" @click="showStartHourOptions = true" />
      <ul v-show="showStartHourOptions" class="dropdown-menu">
        <li v-for="hour in hours" :key="hour" @click="selectStartHour(hour)">{{ hour }}</li>
      </ul>
    </div>
    時
    <div class="dropdown">
      <input type="text" v-model="startMinute" @click="showStartMinuteOptions = true" />
      <ul v-show="showStartMinuteOptions" class="dropdown-menu">
        <li v-for="minute in minutes" :key="minute" @click="selectStartMinute(minute)">
          {{ minute }}
        </li>
      </ul>
    </div>
    分
    <br />
    <label>就業終了時間:</label>
    <div class="dropdown">
      <input type="text" v-model="endHour" @click="showEndHourOptions = true" />
      <ul v-show="showEndHourOptions" class="dropdown-menu">
        <li v-for="hour in hours" :key="hour" @click="selectEndHour(hour)">{{ hour }}</li>
      </ul>
    </div>
    時
    <div class="dropdown">
      <input type="text" v-model="endMinute" @click="showEndMinuteOptions = true" />
      <ul v-show="showEndMinuteOptions" class="dropdown-menu">
        <li v-for="minute in minutes" :key="minute" @click="selectEndMinute(minute)">
          {{ minute }}
        </li>
      </ul>
    </div>
    分
    <br />
    <label>休憩時間:</label>
    <div class="dropdown">
      <input type="text" v-model="restHour" @click="showRestHourOptions = true" />
      <ul v-show="showRestHourOptions" class="dropdown-menu">
        <li v-for="hour in hours" :key="hour" @click="selectRestHour(hour)">{{ hour }}</li>
      </ul>
    </div>
    時間
    <div class="dropdown">
      <input type="text" v-model="restMinute" @click="showRestMinuteOptions = true" />
      <ul v-show="showRestMinuteOptions" class="dropdown-menu">
        <li v-for="minute in minutes" :key="minute" @click="selectRestMinute(minute)">
          {{ minute }}
        </li>
      </ul>
    </div>
    分
    <br />
    <label>遅刻理由:</label>
    <div class="dropdown">
      <input
        type="text"
        v-model="defaultTardinessStatus"
        @click="showTardinessStatusOptions = true"
      />
      <ul v-show="showTardinessStatusOptions" class="dropdown-menu">
        <li
          v-for="tardinessStatus in tardinessStatuses"
          :key="tardinessStatus"
          @click="selectTardinessStatus(tardinessStatus)"
        >
          {{ tardinessStatus }}
        </li>
      </ul>
    </div>
    <br />
    <label>コメント:</label>
    <textarea name="comment" v-model="comment" cols="30" rows="1" />
    <br />
    <div>
      <p>勤務時間合計:{{ totalWorkHours }}</p>
    </div>
    <button type="submit">登録する</button>
    <!-- @click="$router.push({path:'/daily/attendanceRegistration/attendanceCompleted'}) -->
  </form>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import CalenderTable from '../components/CalenderTable.vue'
import { useStoreSelectedDate } from '../stores/selectedDate'
import { useUserInfoStore } from '@/stores/userInfo'

// 初期値勤務時間
const startHour = ref('')
const startMinute = ref('')
const endHour = ref('')
const endMinute = ref('')
const restHour = ref('')
const restMinute = ref('')
const comment = ref('')

// 初期値遅刻理由
const defaultTardinessStatus = ref('')

// 初期値出欠
const defaultAttendantStatus = ref('')

// ドロップダウンリスト表示非表示
const showStartHourOptions = ref(false)
const showStartMinuteOptions = ref(false)
const showEndHourOptions = ref(false)
const showEndMinuteOptions = ref(false)
const showRestHourOptions = ref(false)
const showRestMinuteOptions = ref(false)
const showTardinessStatusOptions = ref(false)
const showAttendantStatusOptions = ref(false)

// ドロップダウンリストの選択肢
const hours = Array.from({ length: 48 }, (_, index) => String(index).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'))
const attendantStatuses = ['出勤', '有給', '半休', '慶弔休', '欠勤', '休日出勤']
const tardinessStatuses = ['なし', '電車遅延', '自己都合', 'その他']

//選択時のアクション
const selectStartHour = (hour) => {
  startHour.value = hour
  showStartHourOptions.value = false
}
const selectStartMinute = (minute) => {
  startMinute.value = minute
  showStartMinuteOptions.value = false
}
const selectEndHour = (hour) => {
  endHour.value = hour
  showEndHourOptions.value = false
}
const selectEndMinute = (minute) => {
  endMinute.value = minute
  showEndMinuteOptions.value = false
}
const selectRestHour = (hour) => {
  restHour.value = hour
  showRestHourOptions.value = false
}
const selectRestMinute = (minute) => {
  restMinute.value = minute
  showRestMinuteOptions.value = false
}
const selectAttendantStatus = (attendantStatus) => {
  defaultAttendantStatus.value = attendantStatus
  showAttendantStatusOptions.value = false
}
const selectTardinessStatus = (tardinessStatus) => {
  defaultTardinessStatus.value = tardinessStatus
  showTardinessStatusOptions.value = false
}

// 勤務合計時間の規定
let totalWorkHours = ''

watch([startHour, startMinute, endHour, endMinute, restHour, restMinute], () => {
  const start = Number(startHour.value) * 60 + Number(startMinute.value)
  const end = Number(endHour.value) * 60 + Number(endMinute.value)
  const rest = Number(restHour.value) * 60 + Number(restMinute.value)

  if (start && end && end >= start) {
    const diff = end - (rest + start)

    const hours = Math.floor(diff / 60)
    const minutes = diff % 60

    totalWorkHours = `${hours}時間 ${minutes}分`
  } else {
    totalWorkHours = ''
  }
})

// ドロップダウンリスト消すやつ
const handleDocumentClick = (event) => {
  const target = event.target
  if (!target.closest('.dropdown')) {
    showStartHourOptions.value = false
    showStartMinuteOptions.value = false
    showEndHourOptions.value = false
    showEndMinuteOptions.value = false
    showRestHourOptions.value = false
    showRestMinuteOptions.value = false
    showAttendantStatusOptions.value = false
    showTardinessStatusOptions.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// ユーザー情報をストアから取得
const userInfoStore = useUserInfoStore()
const userId = userInfoStore.userInfo?.user_id

//カレンダーから日付を取得
const selectedDate = ref<Date | null>(null)
const store = useStoreSelectedDate()
store.selectedDate = selectedDate.value

// 非同期通信
const submitForm = async (event) => {
  event.preventDefault()

  const startMinuteForCalculation = Number(startMinute.value) / 60
  const endMinuteForCalculation = Number(endMinute.value) / 60
  const restMinuteForCalculation = Number(restMinute.value) / 60

  const formData = {
    userId: userId,
    date: selectedDate,
    state: '',
    attendance: defaultAttendantStatus.value,
    punch_in: `${startHour.value}:${startMinute.value}`,
    punch_out: `${endHour.value}:${endMinute.value}`,
    break_time: `${restHour.value}:${restMinute.value}`,
    work_hour:
      Number(endHour.value) +
      endMinuteForCalculation -
      (Number(restHour.value) + restMinuteForCalculation) -
      (Number(startHour.value) + startMinuteForCalculation),
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

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown input {
  width: 100px;
}

.dropdown-menu {
  position: absolute;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-menu li {
  padding: 4px 8px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>
