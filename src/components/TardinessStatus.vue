<template>
  
    <label>遅刻理由:</label>
    <div class="dropdown">
      <input
        type="text"
        v-model="defaultTardinessStatus"
        @click="showTardinessStatusOptions = true"
      />
      <ul v-show="showTardinessStatusOptions" class="dropdown-menu">
        <li
          v-for="tardinessStatus in tardinessStatuses"
          :key="tardinessStatus"
          @click="selectTardinessStatus(tardinessStatus)"
        >
          {{ tardinessStatus }}
        </li>
      </ul>
    </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { onUnmounted, ref, onMounted } from 'vue'

// 初期値
const defaultTardinessStatus = ref('')
const showTardinessStatusOptions = ref(false)

// 選択肢
const tardinessStatuses = ['なし', '電車遅延', '自己都合', 'その他']

const selectTardinessStatus = (tardinessStatus) => {
  defaultTardinessStatus.value = tardinessStatus
  showTardinessStatusOptions.value = false
}

// ドロップダウンリスト
const handleDocumentClick = (event) => {
  const target = event.target
  if (!target.closest('.dropdown')) {
    showTardinessStatusOptions.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})

//   コンポーネント間の橋渡し
provide('tardinessStatusData', { defaultTardinessStatus })
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
