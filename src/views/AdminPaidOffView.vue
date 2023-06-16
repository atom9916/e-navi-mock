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
<h2>有給の付与</h2>
<getPaidOffAll/>
<givePaidOff/>
</main>
</template>