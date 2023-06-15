<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import ComponentButton from './ComponentButton.vue';
import type { DailyAttendanceData } from '@/types/dailyAttendanceData.type';
import router from '@/router';


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

const handleUserSelection = (event) => {
  id.value = event.target.value
}
</script>

<template>
  <label>ユーザー選択:</label>
  <select v-model="defaultUser" @change="handleUserSelection">
    <option :value="user.userId" :key="user.userId" v-for="user in users">
      {{ user.userId }}
    </option>
  </select>
  <p>名前:{{ getUserNameById(defaultUser) }}</p>
</template>