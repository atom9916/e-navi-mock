<template>
  <label>年:</label>
  <div class="dropdown">
    <input type="text" v-model="defaultYears" @click="showDefaultYearOptions = true" />
    <ul v-show="showDefaultYearOptions" class="dropdown-menu">
      <li v-for="year in years" :key="year" @click="selectYear(year)">{{ year }}</li>
    </ul>
  </div>
  <label>月:</label>
  <div class="dropdown">
    <input type="text" v-model="defaultMonths" @click="showDefaultMonthsOptions = true" />
    <ul v-show="showDefaultMonthsOptions" class="dropdown-menu">
      <li v-for="month in months" :key="month" @click="selectMonth(month)">{{ month }}</li>
    </ul>
  </div>
  <br />
  <button type="submit" @click="generateCalendar">確認</button>

  <table>
    <thead>
      <tr>
        <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="week in weeks" :key="String(week)">
        <td v-for="day in week" :key="day">
          <template v-if="day !== 0">
            <button @click="selectDate(day)" class="button">{{ day }}</button>
          </template>
          <template v-else></template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, onMounted, onUnmounted } from 'vue'
import { useStoreSelectedDate } from '@/stores/selectedDate';

// 初期値
const defaultYears = ref(dayjs().year())
const defaultMonths = ref(dayjs().month() +1)
const selectedDate = ref<Date | null>(null)
const formattedDate = ref<string>('')

// ドロップダウンリストの表示非表示
const showDefaultYearOptions = ref(false)
const showDefaultMonthsOptions = ref(false)

// 選択肢
const years = [2022, 2023, 2024]
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// 選択時のアクション
const selectYear = (year) => {
  defaultYears.value = year
  showDefaultYearOptions.value = false
}
const selectMonth = (month) => {
  defaultMonths.value = month
  showDefaultMonthsOptions.value = false
}

const selectDate = (day) => {
  const year = defaultYears.value
  const month = defaultMonths.value - 1
  const selected = dayjs().year(year).month(month).date(day).locale('ja')
  selectedDate.value = selected.toDate()
  const store = useStoreSelectedDate()
  store.setSelectedDate(selected.toDate())
  formattedDate.value = selected.format('YYYY年M月D日')
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
})
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})


// カレンダー作成

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']
const weeks = ref<number[][]>([])

onMounted(() => {
  generateCalendar()
})

function generateCalendar() {
  const year = defaultYears.value
  const month = defaultMonths.value - 1
  const startDate = dayjs().year(year).month(month).startOf('month').startOf('week')
  const endDate = dayjs().year(year).month(month).endOf('month').endOf('week')

  const newWeeks: number[][] = []
  let currentDay = startDate

  while (currentDay.isBefore(endDate)) {
    const week: number[] = []
    for (let i = 0; i < 7; i++) {
      if (currentDay.month() === month) {
        week.push(currentDay.date())
      } else {
        week.push(0) // 非表示の日付を0で埋める
      }
      currentDay = currentDay.add(1, 'day')
    }
    newWeeks.push(week)
  }
  weeks.value = newWeeks
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

.button {
  border: none;
  background-color: #fff;
  cursor: pointer;
}
</style>
