<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentDate = ref('')
const currentTime = ref('')

const updateDateTime = () => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString()
  currentTime.value = now.toLocaleTimeString()
}

onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
})
</script>

<template>
  <div>
    <p>
      今日は&nbsp;<span style="font-weight: 500; font-size: 1.4em; color: red">{{
        currentDate
      }}</span
      >&nbsp;です
    </p>
  </div>
  <div>
    <p>
      現在の時刻は&nbsp;<span style="font-weight: 250; font-size: 1.4em">{{ currentTime }}</span
      >&nbsp;です
    </p>
  </div>
  <div><p>今日もお仕事、がんばりましょう</p></div>
</template>
