<script setup lang="ts">
import { useClockIn } from '../stores/clockIn'
import { useClockOut } from '../stores/clockOut'
import ComponentButton from './atoms/ComponentButton.vue';
import { useUserInfoStore } from '@/stores/userInfo'
import axios from 'axios';
import { ref,onMounted } from 'vue';

// 日付
const currentDate = ref('')

const updateDate = () =>{
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth()+1).toString().padStart(2,'0')
  const day = now.getDate().toString().padStart(2,'0')
  currentDate.value = `${year}-${month}-${day}`
}

onMounted(() => {
  updateDate()
})

//ストアから出退勤時間を取得
const storeClockIn = useClockIn()
const storeClockOut = useClockOut()

// 勤務時間の計算
const startHour = ref('')
const startMinute = ref('')
const endHour = ref('')
const endMinute = ref('')

const startSplit = storeClockIn.clockIn.split(':')
startHour.value = startSplit[0]
startMinute.value = startSplit[1]

const endSplit = storeClockOut.clockOut.split(':')
endHour.value = endSplit[0]
endMinute.value = endSplit[1]

const totalMinutes = ((Number(endHour.value)*60)+Number(endMinute.value)) 
                   - ((Number(startHour.value)*60)+Number(startMinute.value)+ 60)

let workHour = Math.floor(totalMinutes/60)
workHour = Math.min(workHour, 8)




// ユーザー情報をストアから取得
const userInfoStore = useUserInfoStore()
const userId = userInfoStore.userInfo?.user_id

// 非同期通信(ポスト)
const submitFromMainpage = async ( ) => {

  const submitData = {
    userId:userId,
    date:currentDate.value,
    state:'依頼中',
    shift:'一日社内業務',
    attendance:'出勤',
    punch_in: storeClockIn.clockIn,
    punch_out: storeClockOut.clockOut,
    break_time: `01:00`,
    work_hour:workHour,
    overtime:0,
    midnight: '00:00',
    midnightOvertime: '00:00',
    timePaidHoliday: 0,
    lateOrEarlyLeave:0,
    tardiness: 'なし',
    comment: 'テスト、メインページからポスト(日付修正)'
  }
  try{
    const url = import.meta.env.VITE_AWS_API_URL
    const responseDynamo = await axios.post(`${url}/daily`, submitData, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_AWS_API_KEY
      }
  })
  alert('勤怠を登録しました')
  if (responseDynamo.status === 200) {
      console.log('勤怠データが保存されました')
    } else {
      console.error('勤怠データは保存出来ていません')
    }
  } catch (error) {
    console.error('エラーが発生しました', error)
}
}
</script>

<template>
    <p>出勤 {{ storeClockIn.clockIn ? storeClockIn.clockIn : '- - :- -' }}</p>
    <p>退勤 {{ storeClockOut.clockOut ? storeClockOut.clockOut : '- - : - -'}}</p>
    <ComponentButton buttonText="承認依頼" @click="submitFromMainpage"/>
</template>