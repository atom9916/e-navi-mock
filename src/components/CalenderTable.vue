<template>
  <label>年:</label>
  <select v-model="defaultYears">
    <option :value="year" :key="year" v-for="year in years">{{ year }}</option>
  </select>
  <span>&nbsp;</span>
  <label>月:</label>
  <select v-model="defaultMonths">
    <option :value="month" :key="month" v-for="month in months">{{ month }}</option>
  </select>
  <br />
  <ComponentButton buttonText="確認" type="submit" @click="generateCalendar" />

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
import { useStoreSelectedDate } from '@/stores/selectedDate'
import ComponentButton from './atoms/ComponentButton.vue'

// 初期値
const defaultYears = ref(dayjs().year())
const defaultMonths = ref(dayjs().month() + 1)
const selectedDate = ref<Date | null>(null)

// ドロップダウンリストの表示非表示
const showDefaultYearOptions = ref(false)
const showDefaultMonthsOptions = ref(false)

// 選択肢
const years = [2022, 2023, 2024]
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const selectDate = (day) => {
  const year = defaultYears.value
  const month = defaultMonths.value - 1
  const selected = dayjs().year(year).month(month).date(day).locale('ja')
  selectedDate.value = selected.toDate()
  const store = useStoreSelectedDate()
  store.setSelectedDate(selected.toDate())
  console.log(selectedDate.value)
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
  display: none;
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

table {
  border-collapse: none;
}

th,
td {
  border: none;
  padding: 8px;
}
</style>
