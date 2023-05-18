<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const startHour = ref('')
const startMinute = ref('')
const endHour = ref('')
const endMinute = ref('')
const showStartHourOptions = ref(false)
const showStartMinuteOptions = ref(false)
const showEndHourOptions = ref(false)
const showEndMinuteOptions = ref(false)

const hours = Array.from({ length: 48 }, (_, index) => String(index).padStart(2, '0'))
const minutes = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, '0'))

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

// onMounted(() => {
//   document.addEventListener('click', hideDropdowns)
// })

// const hideDropdowns = () => {
//   showStartHourOptions.value = false
//   showStartMinuteOptions.value = false
//   showEndHourOptions.value = false
//   showEndMinuteOptions.value = false
// }
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown input {
  width: 40px; /* 幅を調整する値に変更してください */
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
