export type GameMode = 'normal' | 'hypermode'

export type AitStage = 'modeSelect' | 'profiles' | 'levelSelect' | 'relaxation' | 'practice' | 'feedback'

export interface Profile {
  id: ProfileId
  name: string
  desc: string
}

export type ProfileId = 'shapes' | 'colors' | 'numbers' | 'emotions' | 'locations'

export interface LevelConfig {
  name: string
  targets: number
  choices: number
}

export interface FeedbackData {
  correct: boolean
  message: string
}
