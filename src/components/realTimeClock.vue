<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentDate = ref('')
const currentTime = ref('')
const now = new Date()


const updateDateTime = (now:Date) => {
  currentDate.value = now.toLocaleDateString() 
  currentTime.value = now.toLocaleTimeString() 
}

onMounted(() => {
  updateDateTime(now)
  setInterval(updateDateTime, 1000)
})
</script>

<template>
   <section aria-labelledby="today-contents">
    <p id="today-contents">
      今日は&nbsp;<span style="font-weight: 500; font-size: 1.4em; color: red">{{
        currentDate
      }}</span
      >&nbsp;です
    </p>
  </section>
  <section aria-labelledby="now-contents">
    <p id="now-contents">
      現在の時刻は&nbsp;<span style="font-weight: 250; font-size: 1.4em">{{ currentTime }}</span
      >&nbsp;です
    </p>
  </section>
  <section aria-labelledby="encouragement-message">
    <p id="encouragement-message">今日もお仕事、がんばりましょう…</p>
  </section>
</template>
