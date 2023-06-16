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
  <table>
    <th>現在時刻</th>
    <tr>
      <td>
        {{ currentDate }}
      </td>
    </tr>
    <tr>
      <td>
        {{ currentTime }}
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  margin: 0 auto;
  width: 60%;
  font-size: 18px;
  border: 2px solid #1b5e20;
  text-align: center;
  border-collapse: collapse;
}

th {
  border: 2px solid #1b5e20;
  background-color: #1b5e20;
  color: #f7eccf;
}

tr {
  font-size: 22px;
  border: 1px solid #1b5e20;
  background-color: #f7eccf;
}
</style>
