<template>
  <div class="max-w-2xl w-full">
    <div class="text-center mb-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mx-auto mb-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 2v20M2 12h20" />
      </svg>
      <h1 class="text-5xl font-light text-gray-200 mb-3">Choose Your Focus</h1>
      <p class="text-gray-400 text-lg">Select a perception profile</p>
    </div>
    <div class="space-y-4">
      <button
        v-for="p in profiles"
        :key="p.id"
        class="w-full bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg p-6 transition-all duration-500 group"
        @click="$emit('select', p)"
      >
        <div class="flex items-center justify-between">
          <div class="text-left">
            <h3 class="text-xl font-medium text-gray-200 mb-1">{{ p.name }}</h3>
            <p class="text-gray-400 text-sm">{{ p.desc }}</p>
          </div>
          <span class="w-6 h-6 text-gray-500 group-hover:text-gray-300 text-2xl">&rsaquo;</span>
        </div>
      </button>
    </div>
    <button
      class="w-full mt-6 bg-gray-700/30 text-gray-400 py-3 rounded-lg"
      @click="$emit('back')"
    >
      &larr; Back
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '@/types/intuition'
import { profiles } from '@/data/profiles'

defineEmits<{
  select: [profile: Profile]
  back: []
}>()
</script>
