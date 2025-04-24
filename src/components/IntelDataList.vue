<template>
  <a-table :columns="columns" :data-source="data">
    <!-- <template #title>遥感情报信息列表</template> -->
  </a-table>
</template>

<script lang="ts" setup>
import { type IntelData } from '@/types'

let data = [
  {
    id: 'a111',
    content: '',
    imageUrl: '',
    createdAt: '',
    satelliteId: '',
  },
]
</script>

<style scoped></style>
