<template>
  <div class="opacity-40">
    <div v-if="profileId === 'shapes'" v-html="shapeHtml" />
    <div v-else-if="profileId === 'colors'">
      <div class="w-12 h-12 rounded-full" :style="{ background: colorValue, opacity: 0.25 }" />
    </div>
    <div v-else-if="profileId === 'numbers'" class="flex flex-wrap gap-1 justify-center w-16 h-16 items-center">
      <div v-for="n in dotCount" :key="n" class="w-2 h-2 rounded-full bg-white/25" />
    </div>
    <div v-else class="w-12 h-12 rounded-full bg-white/10" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProfileId } from '@/types/intuition'

const props = defineProps<{
  target: string
  profileId: ProfileId
}>()

const SHAPE_HTML: Record<string, string> = {
  circle: '<div class="w-14 h-14 rounded-full border-3 border-white/20"></div>',
  square: '<div class="w-14 h-14 border-3 border-white/20"></div>',
  triangle: '<div class="w-0 h-0 border-l-[28px] border-r-[28px] border-b-[48px] border-l-transparent border-r-transparent border-b-white/20"></div>',
  star: '<div class="text-4xl text-white/20">★</div>'
}

const shapeHtml = computed(() => {
  return SHAPE_HTML[props.target] ?? '<div class="w-14 h-14 rounded-full border-3 border-white/20"></div>'
})

const COLOR_MAP: Record<string, string> = {
  red: '#ff4444', blue: '#4444ff', green: '#44ff44', yellow: '#ffff44',
  purple: '#aa44aa', orange: '#ffaa44', pink: '#ffaacc', white: '#ffffff'
}

const colorValue = computed(() => COLOR_MAP[props.target] ?? '#ffffff')

const dotCount = computed(() => {
  const num = parseInt(props.target) || 0
  return Math.max(num > 12 ? Math.floor(num / 10) : num, 0)
})
</script>
