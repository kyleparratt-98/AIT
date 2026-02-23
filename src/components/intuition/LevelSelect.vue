<template>
  <div class="max-w-3xl w-full">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-light text-gray-200 mb-2">Select Your Level</h2>
      <p class="text-gray-400">{{ profile.name }}</p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
      <button
        v-for="(cfg, lvl) in levels"
        :key="lvl"
        class="bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg p-4"
        @click="$emit('select', Number(lvl))"
      >
        <p class="text-2xl font-light text-gray-300 mb-1">{{ lvl }}</p>
        <p class="text-xs text-gray-400 mb-2">{{ cfg.name }}</p>
        <p class="text-xs text-gray-500">{{ cfg.choices }} choices</p>
      </button>
    </div>
    <button
      class="w-full bg-gray-700/50 text-gray-300 py-3 rounded-lg"
      @click="$emit('back')"
    >
      &larr; Back
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '@/types/intuition'
import { levels } from '@/data/profiles'

defineProps<{
  profile: Profile
}>()

defineEmits<{
  select: [level: number]
  back: []
}>()
</script>
