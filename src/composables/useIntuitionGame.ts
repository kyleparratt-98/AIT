import { ref, computed, onUnmounted } from 'vue'
import type { GameMode, AitStage, Profile, FeedbackData } from '@/types/intuition'
import { levels, targetsByProfile } from '@/data/profiles'
import type { useBreathing } from './useBreathing'

function shuffle<T>(arr: T[]): T[] {
  return arr.map(v => [Math.random(), v] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map(x => x[1])
}

export function useIntuitionGame(breathing: ReturnType<typeof useBreathing>) {
  const stage = ref<AitStage>('modeSelect')
  const mode = ref<GameMode>('normal')
  const profile = ref<Profile | null>(null)
  const level = ref(1)
  const target = ref('')
  const choices = ref<string[]>([])
  const score = ref(0)
  const attempts = ref(0)
  const usedTargets = ref<string[]>([])
  const relaxationTimer = ref(10)
  const showHint = ref(false)
  const hintUsed = ref(false)
  const selectedChoice = ref('')
  const feedback = ref<FeedbackData | null>(null)

  let relaxIntervalId: ReturnType<typeof setInterval> | null = null

  const isRoundEnd = computed(() => {
    const L = levels[level.value]
    return attempts.value >= L.targets
  })

  function selectMode(m: GameMode) {
    mode.value = m
    stage.value = 'profiles'
  }

  function selectProfile(prof: Profile) {
    profile.value = prof
    stage.value = 'levelSelect'
  }

  function selectLevel(lvl: number) {
    level.value = lvl
    stage.value = 'relaxation'
    relaxationTimer.value = 10
    startRelaxation()
  }

  function startRelaxation() {
    breathing.start()
    stopRelaxTimer()
    relaxIntervalId = setInterval(() => {
      if (relaxationTimer.value > 0) {
        relaxationTimer.value--
      } else {
        stopRelaxTimer()
        startPractice()
      }
    }, 1000)
  }

  function stopRelaxTimer() {
    if (relaxIntervalId) {
      clearInterval(relaxIntervalId)
      relaxIntervalId = null
    }
  }

  function startPractice() {
    breathing.stop()
    const targets = targetsByProfile[profile.value!.id]
    const numChoices = levels[level.value].choices
    const available = targets.filter(t => !usedTargets.value.includes(t))
    const pool = available.length >= numChoices ? available : targets
    const randomTarget = pool[Math.floor(Math.random() * pool.length)]

    usedTargets.value = [...usedTargets.value.slice(-7), randomTarget]
    target.value = randomTarget
    showHint.value = false
    hintUsed.value = false

    if (mode.value === 'hypermode') {
      choices.value = []
    } else {
      const others = pool.filter(t => t !== randomTarget)
      const wrong = shuffle(others).slice(0, numChoices - 1)
      choices.value = shuffle([randomTarget, ...wrong])
    }
    stage.value = 'practice'
  }

  function toggleHint() {
    showHint.value = !showHint.value
    if (showHint.value) hintUsed.value = true
  }

  function submitGuess(choice: string) {
    selectedChoice.value = choice
    attempts.value += 1
    const isCorrect = choice.toLowerCase().trim() === target.value.toLowerCase().trim()

    if (isCorrect && !hintUsed.value) {
      score.value += 1
      feedback.value = { correct: true, message: 'Perfect! Your intuition is strong.' }
    } else if (isCorrect && hintUsed.value) {
      score.value += 0.5
      feedback.value = { correct: true, message: 'Correct! (Hint used - half points)' }
    } else {
      feedback.value = { correct: false, message: `The target was: ${target.value}. Keep practicing!` }
    }
    stage.value = 'feedback'
  }

  function nextRound() {
    const L = levels[level.value]
    if (attempts.value >= L.targets) {
      const accuracy = attempts.value ? (score.value / attempts.value) * 100 : 0
      const required = (100 / L.choices) * 1.5
      if (accuracy >= required && level.value < 10) {
        level.value += 1
        score.value = 0
        attempts.value = 0
      }
      stage.value = 'relaxation'
      relaxationTimer.value = 10
      startRelaxation()
    } else {
      startPractice()
    }
  }

  function resetGame() {
    stage.value = 'modeSelect'
    mode.value = 'normal'
    profile.value = null
    level.value = 1
    target.value = ''
    choices.value = []
    score.value = 0
    attempts.value = 0
    usedTargets.value = []
    relaxationTimer.value = 10
    showHint.value = false
    hintUsed.value = false
    selectedChoice.value = ''
    feedback.value = null
    breathing.stop()
    stopRelaxTimer()
  }

  function goBack() {
    if (stage.value === 'profiles') stage.value = 'modeSelect'
    else if (stage.value === 'levelSelect') stage.value = 'profiles'
  }

  function copyResults() {
    const acc = attempts.value ? Math.round((score.value / attempts.value) * 100) : 0
    const text = `AIT Results - ${new Date().toLocaleString()}
Mode: ${mode.value}
Profile: ${profile.value!.name}
Level: ${level.value}
Score: ${score.value}/${attempts.value} (${acc}%)`
    navigator.clipboard.writeText(text).then(() => alert('Results copied!'))
  }

  onUnmounted(() => {
    breathing.stop()
    stopRelaxTimer()
  })

  return {
    stage,
    mode,
    profile,
    level,
    target,
    choices,
    score,
    attempts,
    relaxationTimer,
    showHint,
    hintUsed,
    selectedChoice,
    feedback,
    isRoundEnd,
    selectMode,
    selectProfile,
    selectLevel,
    toggleHint,
    submitGuess,
    nextRound,
    resetGame,
    goBack,
    copyResults
  }
}
