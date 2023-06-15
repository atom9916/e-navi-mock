<template>
  <div>
    <button class="button">{{ buttonText }}</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  buttonText: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.button {
  cursor: pointer;
  background-color: #ffe082;
  cursor: pointer;
  color: #1b5e20;
  margin: 10px 0;
  padding: 7px;
  font-weight: 700;
  font-size: 16px;
  width: 100%;
  border: 1px solid #1b5e20;
  border-radius: 8px;
  border-bottom: 4px solid rgb(72, 64, 4);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}
.button:hover {
  margin-top: 13px;
  background-color: #f8c11f;
  border-bottom: 1px solid rgb(72, 64, 4);
}
</style>
