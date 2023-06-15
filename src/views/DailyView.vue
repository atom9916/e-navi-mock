<script setup lang="ts">
import { useHead } from '@vueuse/head'
import TimeEntryForm from '../components/TimeEntryForm.vue'
import CalenderTable from '@/components/CalenderTable.vue'
import getPaidOff from '@/components/getPaidOff.vue'

useHead({
  title: '日次勤怠'
})
</script>

<template>
  <CalenderTable />
  <getPaidOff />
  <TimeEntryForm />
</template>
