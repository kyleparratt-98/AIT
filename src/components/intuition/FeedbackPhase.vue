<template>
  <div class="max-w-md w-full text-center">
    <div
      class="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center border-4"
      :class="feedback.correct ? 'bg-green-900/30 border-green-700' : 'bg-red-900/30 border-red-700'"
    >
      <!-- Correct icon -->
      <svg v-if="feedback.correct" xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <!-- Wrong icon -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
      </svg>
    </div>

    <h2
      class="text-3xl font-light mb-4"
      :class="feedback.correct ? 'text-green-400' : 'text-red-400'"
    >
      {{ feedback.correct ? 'Correct!' : 'Not quite' }}
    </h2>
    <p class="text-gray-300 mb-2 text-lg">{{ feedback.message }}</p>
    <p v-if="!feedback.correct" class="text-gray-500 text-sm mb-8">You chose: {{ selectedChoice }}</p>

    <div class="bg-gray-700/30 rounded-lg p-6 border border-gray-600 mb-8">
      <div class="grid grid-cols-2 gap-4 text-center">
        <div>
          <p class="text-gray-400 text-sm mb-1">Score</p>
          <p class="text-gray-200 text-2xl font-light">{{ score }}/{{ attempts }}</p>
        </div>
        <div>
          <p class="text-gray-400 text-sm mb-1">Accuracy</p>
          <p class="text-gray-200 text-2xl font-light">{{ accuracy }}%</p>
        </div>
      </div>
    </div>

    <div v-if="isEnd" class="space-y-3">
      <button
        class="w-full bg-blue-900/30 border border-blue-800 text-blue-300 py-3 rounded-lg"
        @click="$emit('copy')"
      >
        &#128203; Copy Results
      </button>
      <button
        class="w-full bg-gray-600 text-gray-200 py-3 rounded-lg"
        @click="$emit('next')"
      >
        Continue Training
      </button>
      <button
        class="w-full bg-gray-700/50 text-gray-300 py-3 rounded-lg"
        @click="$emit('reset')"
      >
        &#10226; Start Over
      </button>
    </div>
    <button
      v-else
      class="w-full bg-gray-600 text-gray-200 py-3 rounded-lg"
      @click="$emit('next')"
    >
      Next Target
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FeedbackData } from '@/types/intuition'

const props = defineProps<{
  feedback: FeedbackData
  selectedChoice: string
  score: number
  attempts: number
  isEnd: boolean
}>()

defineEmits<{
  next: []
  reset: []
  copy: []
}>()

const accuracy = computed(() =>
  props.attempts ? Math.round((props.score / props.attempts) * 100) : 0
)
</script>
