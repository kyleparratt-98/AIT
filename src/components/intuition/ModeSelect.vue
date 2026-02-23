<template>
  <div class="max-w-2xl w-full">
    <div class="text-center mb-12">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 mx-auto mb-6 text-gray-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <h1 class="text-5xl font-light text-gray-200 mb-3">Advanced Intuition Training</h1>
      <p class="text-gray-500 text-sm mb-2">Based on Remote Viewing protocols from CIA Stargate Project</p>
      <p class="text-gray-400 text-lg">Select Your Training Mode</p>
    </div>
    <div class="space-y-4">
      <button
        class="w-full bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg p-6 transition-all duration-500 group"
        @click="$emit('select', 'normal')"
      >
        <div class="flex items-center justify-between">
          <div class="text-left">
            <h3 class="text-xl font-medium text-gray-200 mb-1">Normal Mode</h3>
            <p class="text-gray-400 text-sm">Standard intuition training with progressive levels</p>
          </div>
          <span class="w-6 h-6 text-gray-500 group-hover:text-gray-300 text-2xl">&rsaquo;</span>
        </div>
      </button>
      <button
        class="w-full bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-700 rounded-lg p-6 transition-all duration-500 group"
        @click="$emit('select', 'hypermode')"
      >
        <div class="flex items-center justify-between">
          <div class="text-left">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-xl font-medium text-purple-300">Hypermode</h3>
              <span class="text-purple-400">&#9889;</span>
            </div>
            <p class="text-gray-400 text-sm">Advanced training for real remote viewers</p>
          </div>
          <span class="w-6 h-6 text-purple-500 text-2xl">&rsaquo;</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GameMode } from '@/types/intuition'

defineEmits<{
  select: [mode: GameMode]
}>()
</script>
