<script setup lang="ts">
import {useHead} from '@vueuse/head'
import getPaidOffAll from '@/components/getPaidOffAll.vue'
import givePaidOff from '@/components/givePaidOff.vue'

useHead({
    title:'有給付与'
})
</script>

<template>
<main>
<h2>有給を付与するぜ</h2>
<givePaidOff/>
<getPaidOffAll/>
</main>
</template>