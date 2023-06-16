<template>
  <div>
    <label for="name">● {{ inputName }}</label>
    <input
      id="name"
      :type="inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      required
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  inputName: {
    type: String,
    required: true
  },
  inputType: {
    type: String,
    required: true
  },
  modelValue: {
    type: String
  },
  placeholder: {
    type: String
  }
})
const emits = ['update:modelValue']

props
emits
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
}

input {
  border-radius: 5px;
  border: 1px solid darkslategray;
  width: 300px;
  height: 30px;
  font-size: 16px;
}
</style>
