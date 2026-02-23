<template>
  <div class="max-w-2xl w-full">
    <div class="flex justify-between items-center mb-6">
      <div class="text-gray-400 text-sm">{{ modeText }}</div>
      <div class="text-gray-400 text-sm">{{ attempts + 1 }} / {{ levelConfig.targets }}</div>
    </div>

    <!-- Hypermode -->
    <template v-if="mode === 'hypermode'">
      <div class="bg-gray-700/30 rounded-lg p-8 border border-gray-600 mb-8 relative overflow-hidden">
        <div class="text-center relative z-20">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-purple-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
          </svg>
          <p class="text-purple-300 text-xl mb-2">What do you perceive?</p>
          <p class="text-gray-500 text-sm mb-4">Trust only your remote viewing abilities...</p>
          <p class="text-purple-400 text-xs">Type your answer below</p>
        </div>
      </div>
      <input
        ref="hyperInput"
        v-model="typedAnswer"
        type="text"
        placeholder="Type what you sense..."
        class="w-full bg-gray-700/50 border border-purple-700/50 rounded-lg px-6 py-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-600 mb-4 text-center text-xl"
        @keypress.enter="submitTyped"
      />
      <button
        :disabled="!typedAnswer.trim()"
        class="w-full bg-purple-900/50 hover:bg-purple-800/50 text-purple-300 font-medium py-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        @click="submitTyped"
      >
        Submit Perception
      </button>
    </template>

    <!-- Normal mode -->
    <template v-else>
      <div class="bg-gray-700/30 rounded-lg p-8 border border-gray-600 mb-8 relative overflow-hidden">
        <div v-if="showHint" class="absolute inset-0 flex items-center justify-center z-10">
          <HintVisualization :target="target" :profile-id="profile.id" />
        </div>
        <div class="text-center relative z-20">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-500 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
          </svg>
          <p class="text-gray-300 text-xl mb-2">Which one do you sense?</p>
          <p class="text-gray-500 text-sm mb-4">Trust your first instinct...</p>
          <button
            class="bg-gray-800/40 text-gray-600 px-4 py-2 rounded-lg text-xs border border-gray-700/50"
            @click="$emit('toggleHint')"
          >
            {{ showHint ? 'clear' : 'help' }}
          </button>
        </div>
      </div>
      <div :class="gridClass" class="gap-3 mb-6">
        <button
          v-for="c in choices"
          :key="c"
          class="bg-gray-700/50 hover:bg-gray-600/70 border border-gray-600 rounded-lg p-6 transform hover:scale-105"
          @click="$emit('submit', c)"
        >
          <p class="text-gray-200 text-lg">{{ c }}</p>
        </button>
      </div>
    </template>

    <div class="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
      <div class="flex justify-between text-sm">
        <span class="text-gray-400">Accuracy</span>
        <span class="text-gray-300">{{ accuracy }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { GameMode, Profile } from '@/types/intuition'
import { levels } from '@/data/profiles'
import HintVisualization from './HintVisualization.vue'

const props = defineProps<{
  mode: GameMode
  level: number
  target: string
  choices: string[]
  profile: Profile
  showHint: boolean
  score: number
  attempts: number
}>()

const emit = defineEmits<{
  toggleHint: []
  submit: [choice: string]
}>()

const typedAnswer = ref('')
const hyperInput = ref<HTMLInputElement | null>(null)

const levelConfig = computed(() => levels[props.level])

const modeText = computed(() =>
  props.mode === 'hypermode' ? 'HYPERMODE' : `Level ${props.level}: ${levelConfig.value.name}`
)

const gridClass = computed(() => {
  const n = levelConfig.value.choices
  if (n <= 3) return 'grid grid-cols-1'
  if (n <= 6) return 'grid grid-cols-2'
  return 'grid grid-cols-3'
})

const accuracy = computed(() =>
  props.attempts ? Math.round((props.score / props.attempts) * 100) : 0
)

function submitTyped() {
  if (typedAnswer.value.trim()) {
    emit('submit', typedAnswer.value.trim())
    typedAnswer.value = ''
  }
}

onMounted(() => {
  hyperInput.value?.focus()
})
</script>
