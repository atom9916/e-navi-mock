<template>
     <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>User ID</th>
        <th>Total Amount</th>
        <th>Used Amount</th>
        <th>Remaining Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in paidOffData" :key="item.id" :value="item">
        <td>{{ item.id }}</td>
        <td>{{ item.user_id }}</td>
        <td>{{ item.total_amount }}</td>
        <td>{{ item.used_amount }}</td>
        <td>{{ item.remaining_amount }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">

import axios from 'axios';
import { ref, onMounted } from 'vue';

interface PaidOff{

  id:number             
  user_id:String       
  total_amount:number      
  used_amount:number      
  remaining_amount:number     
}

const paidOffData = ref([]as PaidOff[] )

const fetchPaidOffData = async ()=>{
    try{
        const response = await axios.get('http://localhost:4242/paidOff')
        paidOffData.value = response.data.allPaidOff
        console.log('取得した有給データ',response.data.allPaidOff)
    }catch(error){
        console.error(error)
    }
}
onMounted(()=>{
    fetchPaidOffData()
})
</script>