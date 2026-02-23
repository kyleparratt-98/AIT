<template>
  <div class="max-w-md w-full text-center">
    <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-700/30 border-4 border-gray-600 flex items-center justify-center">
      <span class="text-6xl font-light text-gray-300">{{ timer }}</span>
    </div>
    <h2 class="text-3xl font-light text-gray-200 mb-4">Prepare Your Mind</h2>
    <p class="text-gray-400">Close your eyes. Follow your breath. Clear your thoughts. Let your intuition awaken.</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  timer: number
}>()
</script>
