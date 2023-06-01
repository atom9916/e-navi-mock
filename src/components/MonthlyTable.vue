
あとで消す

<!-- <template>
  <form @submit.prevent="updateCalendar">
    <label>年:</label>
    <div class="dropdown">    
      <select v-model="defaultYears">
      <option :value="year" :key="year" v-for="year in years">{{ year }}</option>
      </select>
      <input type="text" v-model="defaultYears" @click="showDefaultYearOptions = true" /> -->
      <!-- <ul v-show="showDefaultYearOptions" class="dropdown-menu">
        <li v-for="year in years" :key="year" @click="selectYear(year)">{{ year }}</li>
      </ul>
    </div>
    <label>月:</label>
    <div class="dropdown">
      <select v-model="defaultMonths">
      <option :value="month" :key="month" v-for="month in months">{{ month }}</option>
      </select>
      <input type="text" v-model="defaultMonths" @click="showDefaultMonthsOptions = true" />
      <ul v-show="showDefaultMonthsOptions" class="dropdown-menu">
        <li v-for="month in months" :key="month" @click="selectMonth(month)">{{ month }}</li>
      </ul> 
    </div>
    <br />
    <button type="submit">確認</button> 
  </form>
  <br />
  <table>
    <thead>
      <tr>
        <th v-for="topic in topicsOfHeader" :key="topic">{{ topic }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="week in weeks" :key="String(week)">
        <td v-for="day in week" :key="day">
          {{ `${defaultMonths}/${day}` }}
        </td>
        <td td v-for="day in week" :key="day">{{ getWeekday(day) }}</td>
        <td>種別値</td>
        <td>状態値</td>
        <td>シフト値</td>
        <td>出欠値</td>
        <td>開始値</td>
        <td>終了値</td>
        <td>休憩値</td>
        <td>基本値</td>
        <td>残業値</td>
        <td>深夜値</td>
        <td>深夜残値</td>
        <td>時有給値</td>
        <td>終了値</td>
        <td>遅早値</td>
        <td>理由値</td>
        <td>休出日値</td>
        <td>コメント値</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs';
import axios from 'axios';

// 年月選択

const defaultYears = ref(dayjs().year())
const defaultMonths = ref(dayjs().month() +1)

const showDefaultYearOptions = ref(false)
const showDefaultMonthsOptions = ref(false)

const years = [2022, 2023, 2024]
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const selectYear = (year) => {
  defaultYears.value = year
  showDefaultYearOptions.value = false
}

const selectMonth = (month) => {
  defaultMonths.value = month
  showDefaultMonthsOptions.value = false
}

const handleDocumentClick = (event) => {
  const target = event.target
  if (!target.closest('.dropdown')) {
    showDefaultYearOptions.value = false
    showDefaultMonthsOptions.value = false
  }
}



onMounted(() => {
  document.addEventListener('click', handleDocumentClick) 
  updateCalendar()
  }
)
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

//表組
const topicsOfHeader = [
  '日付',
  '曜日',
  '種別',
  '状態',
  'シフト',
  '出欠',
  '開始',
  '終了',
  '休憩',
  '基本',
  '残業',
  '深夜',
  '深夜残',
  '時有給',
  '終了',
  '遅早',
  '理由',
  '休出日',
  'コメント'
]
const weeks = ref<number[][]>([])

const updateCalendar = () => {
  const selectedYear = defaultYears.value
  const selectedMonth = defaultMonths.value - 1

  const startDate = new Date(selectedYear, selectedMonth, 1)
  const endDate = new Date(selectedYear, selectedMonth + 1, 0)

  const newWeeks: number[][] = []

  let currentDay = startDate

  while (currentDay <= endDate) {
    const week: number[] = []

    week.push(currentDay.getDate())
    currentDay.setDate(currentDay.getDate() + 1)
    newWeeks.push(week)
  }
  weeks.value = newWeeks
}

  const getWeekday = (day: number) => {
    const selectedYear = defaultYears.value
    const selectedMonth = defaultMonths.value - 1

    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()

    if (day < 1 || day > lastDayOfMonth) {
      return undefined
    }
    const date = new Date(selectedYear, selectedMonth, day)
    const options = { weekday: 'short' } as Intl.DateTimeFormatOptions

    const weekday = new Intl.DateTimeFormat('ja-JP', options).format(date)
    return `(${weekday})`
  }


</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown input {
  width: 50px;
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
</style> -->
