<template>
     <div class="paidOff">
     <table>
    <thead>
      <tr>
        <th>支給総有給数</th>
        <th>使用済有給数</th>
        <th>残有給数</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ paidOffData.total_amount }}</td>
        <td>{{ paidOffData.used_amount }}</td>
        <td>{{ paidOffData.remaining_amount }}</td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script setup lang="ts">

import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useUserInfoStore } from '@/stores/userInfo'

// 型定義
interface PaidOff{

  id:number             
  user_id:String       
  total_amount:number      
  used_amount:number      
  remaining_amount:number     
}

// user_id取得
const userInfoStore = useUserInfoStore() 
const id = userInfoStore.userInfo?.user_id 

const paidOffData = ref({}as PaidOff )

const fetchPaidOffData = async ()=>{
    try{
        const response = await axios.get(`http://localhost:4242/paidOff/${id}`)
        paidOffData.value = response.data.paidOff
        console.log('取得した有給データ',response.data.paidOff)
    }catch(error){
        console.error(error)
    }
}
onMounted(()=>{
    fetchPaidOffData()
})
</script>

<style>
.paidOff table {
  border-collapse: collapse;
}

.paidOff th,td {
  border: 1px solid black;
  padding: 8px;
  text-align: center;
}
</style>