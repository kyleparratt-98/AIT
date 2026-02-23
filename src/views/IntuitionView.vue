<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
    <ProgressBar :score="game.score.value" :attempts="game.attempts.value" :visible="game.stage.value === 'practice' || game.stage.value === 'feedback'" />
    <BreathingIndicator v-if="game.stage.value === 'relaxation'" :breathing="breathing" />

    <main class="flex items-center justify-center p-4 min-h-screen">
      <ModeSelect v-if="game.stage.value === 'modeSelect'" @select="game.selectMode" />
      <ProfileSelect v-if="game.stage.value === 'profiles'" @select="game.selectProfile" @back="game.goBack" />
      <LevelSelect
        v-if="game.stage.value === 'levelSelect'"
        :profile="game.profile.value!"
        @select="game.selectLevel"
        @back="game.goBack"
      />
      <RelaxationPhase v-if="game.stage.value === 'relaxation'" :timer="game.relaxationTimer.value" />
      <PracticePhase
        v-if="game.stage.value === 'practice'"
        :mode="game.mode.value"
        :level="game.level.value"
        :target="game.target.value"
        :choices="game.choices.value"
        :profile="game.profile.value!"
        :show-hint="game.showHint.value"
        :score="game.score.value"
        :attempts="game.attempts.value"
        @toggle-hint="game.toggleHint"
        @submit="game.submitGuess"
      />
      <FeedbackPhase
        v-if="game.stage.value === 'feedback'"
        :feedback="game.feedback.value!"
        :selected-choice="game.selectedChoice.value"
        :score="game.score.value"
        :attempts="game.attempts.value"
        :is-end="game.isRoundEnd.value"
        @next="game.nextRound"
        @reset="game.resetGame"
        @copy="game.copyResults"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useIntuitionGame } from '@/composables/useIntuitionGame'
import { useBreathing } from '@/composables/useBreathing'
import ProgressBar from '@/components/intuition/ProgressBar.vue'
import BreathingIndicator from '@/components/intuition/BreathingIndicator.vue'
import ModeSelect from '@/components/intuition/ModeSelect.vue'
import ProfileSelect from '@/components/intuition/ProfileSelect.vue'
import LevelSelect from '@/components/intuition/LevelSelect.vue'
import RelaxationPhase from '@/components/intuition/RelaxationPhase.vue'
import PracticePhase from '@/components/intuition/PracticePhase.vue'
import FeedbackPhase from '@/components/intuition/FeedbackPhase.vue'

const breathing = useBreathing()
const game = useIntuitionGame(breathing)
</script>
