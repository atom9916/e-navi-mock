<template>
    <table>
   <thead>
     <tr>
       <th>ユーザーID</th>
       <th>総有給数</th>
       <th>使用有給数</th>
       <th>残有給数</th>
     </tr>
   </thead>
   <tbody>
    <tr v-for="item in paidOffData" :key="item.id" :value="item">
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

<style scoped>
table {
  margin: 50px auto;
  width: 80%;
  border-collapse: collapse;
  border: 2px solid #1b5e20;
}

th {
  background-color: #1b5e20;
  font-size: 18px;
  color: #f7eccf;
}

td {
  background-color: #f7eccf;
  border: 1px solid #1b5e20;
  padding: 8px;
  font-size: 20px;
  text-align: left;
}
</style>