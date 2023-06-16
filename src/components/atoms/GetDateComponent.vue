<template>
  <form>
    <label for="date">取得したい年月：</label>
    <select
      id="date"
      :value="defaultYears"
      @change="emit('update:defaultYears', $event.target.value)"
    >
      <option :key="year" v-for="year in years" :selected="year === defaultYears">
        {{ year }}
      </option></select
    ><span>年</span>
    <select :value="defaultMonths" @change="emit('update:defaultMonths', $event.target.value)">
      <option :key="month" v-for="month in months" :selected="month === defaultMonths">
        {{ month }}
      </option></select
    ><span>月</span>
    <br />
    <ComponentButton buttonText="データを取得" type="submit" />
  </form>
</template>

<script lang="ts" setup>
import ComponentButton from './ComponentButton.vue'
import { PropType } from 'vue'

const props = defineProps({
  defaultYears: {
    type: Number
  },
  defaultMonths: {
    type: Number
  },
  years: {
    type: Array as PropType<number[]>,
    required: true
  },
  months: {
    type: Array as PropType<number[]>,
    required: true
  }
})

const emit = defineEmits(['update:defaultYears', 'update:defaultMonths'])

props
emit
</script>

<style scoped>
form {
  background-color: #f7eccf;
  border: 2px solid #1b5e20;
  border-radius: 5px;
  padding: 10px;
  margin: 50px auto;
}
</style>
