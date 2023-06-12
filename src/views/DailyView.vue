<script setup lang="ts">
import { useHead } from '@vueuse/head'
import TimeEntryForm from '../components/TimeEntryForm.vue'
import getPaidOff from '@/components/getPaidOff.vue';

useHead({
  title: '日次勤怠'
})
</script>

<template>
  <h2>日次勤怠</h2>
  <getPaidOff/>
  <TimeEntryForm />
</template>
