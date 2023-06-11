<template>
    <select v-model="selectedNumber">
        <option :value="number" :key="number" v-for="number in numbers">{{ number }}</option>
    </select>
    <span>&nbsp;</span>
    <button @click="usePaidOff">使う</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserInfoStore } from '@/stores/userInfo'
import axios from 'axios';


//日数選択 
const selectedNumber = ref('')
const numbers = [1,2,3,4,5]


// user_id取得
const userInfoStore = useUserInfoStore() 
const id = userInfoStore.userInfo?.user_id

const usePaidOff = async () => {
    if(selectedNumber.value === ''){
        return;
    }

    const number = parseInt(selectedNumber.value)
    try{
        const response = await axios.get(`http://localhost:4242/paidOff/${id}`)
        const paidOff = response.data
        console.log('現在有給内訳',response.data)

        if(paidOff.remaining_amount >= number){
            const usedAmount = paidOff.used_amount + number
            const remainingAmount = paidOff.remaining_amount - number

            await axios.put(`http://localhost:4242/paidOff/${id}`,{
                used_amount:usedAmount,
                remaining_amount:remainingAmount
            })
            console.log(`${number}日の有給を使用しました`)
        }else{
            console.error('有給が不足しています')
        }
    }catch(error){
      console.error(error)
    }    
}
</script>