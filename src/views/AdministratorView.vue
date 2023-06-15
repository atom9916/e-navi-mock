<script setup lang="ts">
import {useHead} from '@vueuse/head'
import { RouterLink } from 'vue-router'

useHead({
    title:'管理者画面'
})
</script>

<template>
    <main>
    <h2>管理者画面</h2>
    <div>
        <RouterLink to="/admin/approve">承認画面</RouterLink><br>
        <RouterLink to="/admin/paidOff">有給付与</RouterLink>
    </div>
    </main>
    </template>