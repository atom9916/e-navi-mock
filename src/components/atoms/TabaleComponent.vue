<template>
  <table>
    <thead>
      <tr>
        <th v-for="(tabelTitle, index) in tabelTitles" :key="index">{{ tabelTitle }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  tabelTitles: {
    type: Array as PropType<string[]>
  }
})
</script>
