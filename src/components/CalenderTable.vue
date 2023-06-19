<template>
  <div class="calender-wrapper">
    <div class="getDateComponent">
      <GetDateComponent
        :years="years"
        :months="months"
        :defaultYears="defaultYears"
        :defaultMonths="defaultMonths"
        @submit.prevent="generateCalendar"
        @update:defaultYears="defaultYears = $event"
        @update:defaultMonths="defaultMonths = $event"
      />
    </div>

    <table>
      <thead>
        <tr>
          <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in weeks" :key="String(week)">
          <td v-for="day in week" :key="day">
            <div v-if="day !== 0">
              <button @click="selectDate(day)" class="button">{{ day }}</button>
            </div>
            <div v-else></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, onMounted,  } from 'vue'
import { useStoreSelectedDate } from '@/stores/selectedDate'
import GetDateComponent from './atoms/GetDateComponent.vue'

// 初期値
const defaultYears = ref(dayjs().year())
const defaultMonths = ref(dayjs().month() + 1)
const selectedDate = ref<Date | null>(null)

// ドロップダウンリストの表示非表示
// const showDefaultYearOptions = ref(false)
// const showDefaultMonthsOptions = ref(false)

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
  console.log('カレンダーから取得した日付', selectedDate.value)
}

// const handleDocumentClick = (event) => {
//   const target = event.target
//   if (!target.closest('.dropdown')) {
//     showDefaultYearOptions.value = false
//     showDefaultMonthsOptions.value = false
//   }
// }

// onMounted(() => {
//   document.addEventListener('click', handleDocumentClick)
// })
// onUnmounted(() => {
//   document.removeEventListener('click', handleDocumentClick)
// })

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
.calender-wrapper {
  width: 60%;
}

button {
  border: none;
  background-color: #f7eccf;
  color: #1b5e20;
  font-size: 20px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  width: 80%;
  border: 2px solid #1b5e20;
  margin: 50px auto;
}

th {
  background-color: #1b5e20;
  border: 2px solid #1b5e20;
  font-size: 18px;
  color: #f7eccf;
  padding: 5px 0;
}

td {
  border: none;
  padding: 20px 0;
  background-color: #f7eccf;
}

.getDateComponent {
  width: 80%;
  margin: 50px auto;
}
</style>
