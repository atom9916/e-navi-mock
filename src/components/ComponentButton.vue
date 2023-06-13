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
});

</script>

<style scoped>

.button{
  background-color: rgb(12, 233, 167);
  border: none;
  cursor: pointer;
}
.button:hover{
  background-color: rgb(183, 241, 223);
}
</style>
