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
  background-color: rgb(10, 123, 42);
  border: none;
  cursor: pointer;
  color: white;
  font-weight: 700;
  width: 80%;
  border-radius: 5px;
  border-bottom: 4px solid rgb(5, 57, 20);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
}
.button:hover {
  margin-top: 5px;
  background-color: rgb(35, 172, 74);
  border-bottom: 1px solid rgb(4, 44, 15);
}
</style>
