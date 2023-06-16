<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import ComponentButton from '../components/atoms/ComponentButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter()


const defaultUser = ref('')
const id = ref('')

const defaultNewPaidOff = ref(null)
const newPaidOffDays = [1,2,3,4,5,6,7,8,9,10]

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


const givePaidOff = async()=>{
  const response = await axios.get(`http://localhost:4242/paidOff/${id.value}`)
  const paidOff = response.data.paidOff
  console.log('げんざい有給内訳', response.data.paidOff)
  console.log('ユーザーID',id.value)
  if(paidOff){
    const totalAmount = paidOff.total_amount 
    const newPaidOff = defaultNewPaidOff.value
    const remainingAmount = paidOff.remaining_amount

    await axios.put(`http://localhost:4242/paidOff/${id.value}`,{
      total_amount:totalAmount + newPaidOff,
      remaining_amount:remainingAmount + newPaidOff
    })
    console.log(`新規有給を${newPaidOff}日、付与しました`)
    alert(`新規有給を${newPaidOff}日  付与しました`)
    router.push({path:'/admin'})
  }else{
    console.log('これから考える')
    console.log('ユーザーID',id.value)
    console.log('付与日数',defaultNewPaidOff.value)
  }
}
</script>

<template>
  <label>ユーザー選択:</label>
  <select v-model="defaultUser" @change="handleUserSelection">
  <!-- <select v-model="defaultUser"> -->
    <option :value="user.userId" :key="user.userId" v-for="user in users">
      {{ user.userId }}
    </option>
  </select>
  <p>名前:{{ getUserNameById(defaultUser) }}</p>
  <label>新規有給:</label>
  <select v-model="defaultNewPaidOff">
  <option :value="newPaidOffDay" :key="newPaidOffDay" v-for="newPaidOffDay in newPaidOffDays">{{ newPaidOffDay }}</option>
  </select>
  <br>
  <ComponentButton buttonText="付与" @click="givePaidOff()"/>
</template>