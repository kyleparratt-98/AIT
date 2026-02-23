<template>
  <div
    v-if="breathing.active.value"
    class="fixed left-4 top-16 flex items-center gap-3 bg-gray-800/60 px-4 py-3 rounded-lg border border-gray-700"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      :style="{ transform: `scale(${breathing.scale.value.toFixed(3)})` }"
    >
      <path d="M3 8h4l2 6 2-6h4" />
      <path d="M5 16h14" />
    </svg>
    <div>
      <p class="text-gray-400 text-xs">{{ breathing.label() }}</p>
      <div class="w-16 h-1 bg-gray-700 rounded-full mt-1">
        <div class="h-full bg-gray-400" :style="{ width: breathing.progress.value + '%' }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { useBreathing } from '@/composables/useBreathing'

defineProps<{
  breathing: ReturnType<typeof useBreathing>
}>()
</script>
