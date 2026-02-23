<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 right-0 h-2 bg-gray-900 z-50 flex"
  >
    <div class="bg-red-600 transition-all duration-700" :style="{ width: (100 - pct) + '%' }" />
    <div class="bg-green-600 transition-all duration-700" :style="{ width: pct + '%' }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  score: number
  attempts: number
  visible: boolean
}>()

const pct = computed(() => props.attempts ? (props.score / props.attempts) * 100 : 0)
</script>
