<script setup lang="ts">
import { useHead } from '@vueuse/head';
import CalenderTable from '../components/CalenderTable.vue';
useHead({
  title:'月次勤怠'
})
</script>

<template>
    <h2>月次勤怠</h2>
    <component :is='CalenderTable'/>
</template>