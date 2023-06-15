<template>
  <form>
    <label for="date">取得したい年月：</label>
    <select
      id="date"
      :value="defaultYears"
      @select="$emit('update:yearValue', $event.target.value)"
    >
      <option :value="year" :key="year" v-for="year in years">{{ year }}</option></select
    ><span>年</span>
    <select :value="defaultMonths" @select="$emit('update:monthValue', $event.target.value)">
      <option :value="month" :key="month" v-for="month in months">{{ month }}</option></select
    ><span>月</span>
    <br />
    <ComponentButton buttonText="勤怠データを取得" type="submit" />
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
  },
  yearlValue: {
    type: String
  }
})

const emits = ['update:yearValue', 'update:monthValue']

props
emits
</script>
