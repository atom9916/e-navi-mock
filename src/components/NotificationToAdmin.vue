<template>
  <p class="head">お知らせ</p>
  <div class="notification">
    <div v-if="flagOfRT">
      <p>・楽須太郎に承認待ちの勤怠実績があります</p>
    </div>
    <div v-if="flagOfST">
      <p>・総務太郎に承認待ちの勤怠実績があります</p>
    </div>
    <div v-if="flagOfSJ">
      <p>・総務次郎に承認待ちの勤怠実績があります</p>
    </div>
    <div v-if="flagOfSS">
      <p>・総務三郎に承認待ちの勤怠実績があります</p>
    </div>
    <div v-if="!flagOfRT && !flagOfSS && !flagOfSJ && !flagOfSS">
      <p>承認待ちの勤怠実績はありません</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import type { DailyAttendanceData } from '@/types/dailyAttendanceData.type'

// 勤務情報を取得(楽須太郎)

const dailyAttendanceDataOfRT = ref([] as DailyAttendanceData[])
const flagOfRT = ref(false)

const fetchDailyAttendanceDataOfRT = async () => {
  const url = import.meta.env.VITE_AWS_API_URL
  const id = 'onGE8VNwcFSUj6JB64rK83J5SEA3'

  try {
    const response = await axios.get(`${url}/daily?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
    })
    dailyAttendanceDataOfRT.value = response.data.Items
    console.log(`楽須太郎の勤怠情報`, response.data.Items)

    const serchElement = '依頼中'
    const serchForRT = dailyAttendanceDataOfRT.value.find((obj) => obj.state.S === serchElement)
    if (serchForRT) {
      console.log('【！】楽須太郎→承認依頼中')
      flagOfRT.value = true
    } else {
      console.log('楽須太郎承認待ちなし')
    }
  } catch (error) {
    console.error(error)
  }
}

// 勤務情報を取得(総務太郎)
const dailyAttendanceDataOfST = ref([] as DailyAttendanceData[])
const flagOfST = ref(false)

const fetchDailyAttendanceDataOfST = async () => {
  const url = import.meta.env.VITE_AWS_API_URL
  const id = 'j4Rew73n6zSKE9r4xeZVR37zL2h2'

  try {
    const response = await axios.get(`${url}/daily?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
    })
    dailyAttendanceDataOfST.value = response.data.Items
    console.log(`総務太郎の勤怠情報`, response.data.Items)

    const serchElement = '依頼中'
    const serchForST = dailyAttendanceDataOfST.value.find((obj) => obj.state.S === serchElement)
    if (serchForST) {
      console.log('【！】総務太郎→承認依頼中')
      flagOfST.value = true
    } else {
      console.log('総務太郎承認待ちなし')
    }
  } catch (error) {
    console.error(error)
  }
}

// 勤務情報を取得(総務次郎)
const dailyAttendanceDataOfSJ = ref([] as DailyAttendanceData[])
const flagOfSJ = ref(false)

const fetchDailyAttendanceDataOfSJ = async () => {
  const url = import.meta.env.VITE_AWS_API_URL
  const id = 'iJ0AsA1wKheniH4v2Wea93f9JL33'

  try {
    const response = await axios.get(`${url}/daily?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
    })
    dailyAttendanceDataOfSJ.value = response.data.Items
    console.log(`総務次郎の勤怠情報`, response.data.Items)

    const serchElement = '依頼中'
    const serchForSJ = dailyAttendanceDataOfSJ.value.find((obj) => obj.state.S === serchElement)
    if (serchForSJ) {
      console.log('【！】総務次郎→承認依頼中')
      flagOfSJ.value = true
    } else {
      console.log('総務次郎承認待ちなし')
    }
  } catch (error) {
    console.error(error)
  }
}

// 勤務情報を取得(総務三郎)
const dailyAttendanceDataOfSS = ref([] as DailyAttendanceData[])
const flagOfSS = ref(false)

const fetchDailyAttendanceDataOfSS = async () => {
  const url = import.meta.env.VITE_AWS_API_URL
  const id = 'TOJ49p6hdwbA6fDxBeI0AfHMGhg2'

  try {
    const response = await axios.get(`${url}/daily?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
    })
    dailyAttendanceDataOfSS.value = response.data.Items
    console.log(`総務三郎の勤怠情報`, response.data.Items)
    const serchElement = '依頼中'
    const serchForSS = dailyAttendanceDataOfSS.value.find((obj) => obj.state.S === serchElement)
    if (serchForSS) {
      console.log('【！】総務三郎→承認依頼中')
      flagOfSS.value = true
    } else {
      console.log('総務三郎承認待ちなし')
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchDailyAttendanceDataOfRT()
  fetchDailyAttendanceDataOfST()
  fetchDailyAttendanceDataOfSJ()
  fetchDailyAttendanceDataOfSS()
})
</script>

<style scoped>
.notification {
  border: 3px solid #1b5e20;
  margin-bottom: 5%;
  padding: 0.5%;
  background-color: #f7eccf;
}
.head {
  color: #f7eccf;
  font-weight: 900;
  font-size: larger;
  background-color: #1b5e20;
  width: 13%;
  padding: 1%;
}
</style>
