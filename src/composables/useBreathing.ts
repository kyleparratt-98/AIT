import { ref, onUnmounted } from 'vue'

export type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2'

const PHASE_DURATION = 4000

const PHASE_LABELS: Record<BreathPhase, string> = {
  inhale: 'Breathe In',
  hold1: 'Hold',
  exhale: 'Breathe Out',
  hold2: 'Hold'
}

const PHASE_ORDER: BreathPhase[] = ['inhale', 'hold1', 'exhale', 'hold2']

export function useBreathing() {
  const phase = ref<BreathPhase>('inhale')
  const progress = ref(0)
  const scale = ref(1)
  const active = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null
  let phaseStart = 0

  function tick() {
    const elapsed = performance.now() - phaseStart
    const t = Math.min(elapsed / PHASE_DURATION, 1)
    progress.value = t * 100

    if (phase.value === 'inhale') {
      scale.value = 1 + t * 0.3
    } else if (phase.value === 'exhale') {
      scale.value = 1.3 - t * 0.3
    }

    if (elapsed >= PHASE_DURATION) {
      const idx = PHASE_ORDER.indexOf(phase.value)
      phase.value = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length]
      phaseStart = performance.now()
      progress.value = 0
    }
  }

  function start() {
    stop()
    phase.value = 'inhale'
    progress.value = 0
    scale.value = 1
    active.value = true
    phaseStart = performance.now()
    intervalId = setInterval(tick, 100)
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
    active.value = false
  }

  function label(): string {
    return PHASE_LABELS[phase.value]
  }

  onUnmounted(stop)

  return { phase, progress, scale, active, start, stop, label }
}
