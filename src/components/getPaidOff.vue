<template>
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
        <td>{{ paidOffData ? paidOffData.total_amount : 0 }} 日</td>
        <td>{{ paidOffData ? paidOffData.used_amount : 0 }} 日</td>
        <td>{{ paidOffData ? paidOffData.remaining_amount : 0 }} 日</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useUserInfoStore } from '@/stores/userInfo'

// 型定義
interface PaidOff {
  id: number
  user_id: String
  total_amount: number
  used_amount: number
  remaining_amount: number
}

// user_id取得
const userInfoStore = useUserInfoStore()
const id = userInfoStore.userInfo?.user_id

const paidOffData = ref({} as PaidOff)

const fetchPaidOffData = async () => {
  try {
    const response = await axios.get(`http://localhost:4242/paidOff/${id}`)
    paidOffData.value = response.data.paidOff
    console.log('取得した有給データ', response.data.paidOff)
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  fetchPaidOffData()
})
</script>

<style>
table {
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
  text-align: right;
}
</style>
