<template>
  <form>
    <label>出欠:</label>
    <div class="dropdown">
      <input type="text" v-model="defaultAttendantStatus" @click="showAttendantStatusOptions=true" />
      <ul v-show="showAttendantStatusOptions" class="dropdown-menu">
        <li
          v-for="attendantStatus in attendantStatuses"
          :key="attendantStatus"
          @click="selectAttendantStatus(attendantStatus)"
        >{{ attendantStatus }}</li>
      </ul>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onUnmounted, ref, onMounted } from 'vue'

// 初期値
const defaultAttendantStatus = ref('')
const showAttendantStatusOptions = ref(false)

// 選択肢
const attendantStatuses = ['出勤','有給','半休','慶弔休','欠勤','休日出勤']

const selectAttendantStatus = (attendantStatus) => {
  defaultAttendantStatus.value = attendantStatus
  showAttendantStatusOptions.value = false
}

// ドロップダウンリスト
const handleDocumentClick = (event) => {
  const target = event.target
  if (!target.closest('.dropdown')) {
    showAttendantStatusOptions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown input {
  width: 90px;
}

.dropdown-menu {
  position: absolute;
  z-index: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-menu li {
  padding: 4px 8px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>
