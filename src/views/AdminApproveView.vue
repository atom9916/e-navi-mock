<script setup lang="ts">
import {useHead} from '@vueuse/head'
import GetDailyAttendanceAdmin from '@/components/GetDailyAttendanceAdmin.vue';


useHead({
    title:'勤怠承認'
})
</script>


<template>
    <main>
    <h2>勤怠を承認する</h2>
    <GetDailyAttendanceAdmin/>
    </main>
    </template>