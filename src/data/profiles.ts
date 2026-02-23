import type { Profile, LevelConfig, ProfileId } from '@/types/intuition'

export const profiles: Profile[] = [
  { id: 'shapes', name: 'Shapes & Forms', desc: 'Focus on geometric patterns' },
  { id: 'colors', name: 'Colors & Tones', desc: 'Sense color vibrations' },
  { id: 'numbers', name: 'Numbers & Symbols', desc: 'Perceive numerical patterns' },
  { id: 'emotions', name: 'Feelings & Emotions', desc: 'Connect with emotional energy' },
  { id: 'locations', name: 'Places & Spaces', desc: 'Visualize environments' }
]

export const levels: Record<number, LevelConfig> = {
  1: { name: 'Beginner', targets: 5, choices: 2 },
  2: { name: 'Novice', targets: 5, choices: 3 },
  3: { name: 'Learner', targets: 6, choices: 4 },
  4: { name: 'Student', targets: 6, choices: 5 },
  5: { name: 'Practitioner', targets: 7, choices: 6 },
  6: { name: 'Skilled', targets: 7, choices: 7 },
  7: { name: 'Advanced', targets: 8, choices: 8 },
  8: { name: 'Expert', targets: 8, choices: 9 },
  9: { name: 'Master', targets: 9, choices: 10 },
  10: { name: 'Grandmaster', targets: 10, choices: 11 }
}

export const targetsByProfile: Record<ProfileId, string[]> = {
  shapes: ['circle', 'triangle', 'square', 'rectangle', 'star', 'diamond', 'oval', 'cross', 'pentagon', 'hexagon', 'octagon', 'spiral', 'wave', 'zigzag', 'arrow', 'heart', 'crescent', 'pyramid', 'cube', 'sphere', 'cylinder', 'cone', 'torus', 'ellipse', 'trapezoid', 'rhombus', 'parallelogram', 'kite', 'arc', 'helix', 'double helix', 'lotus', 'fan', 'wedge', 'ribbon', 'infinity', 'droplet', 'leaf', 'petal', 'crown'],
  colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'white', 'cyan', 'magenta', 'indigo', 'violet', 'crimson', 'azure', 'emerald', 'gold', 'silver', 'bronze', 'turquoise', 'coral', 'lavender', 'maroon', 'navy', 'olive', 'teal', 'lime', 'amber', 'ruby', 'sapphire', 'jade', 'pearl', 'ivory', 'charcoal', 'slate', 'burgundy', 'plum', 'mint', 'peach', 'cream', 'ebony'],
  numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '11', '22', '33', '44', '55', '66', '77', '88', '99', '100', '111', '222', '333', '444', '555', '666', '777', '888', '999', '1000', '12', '13', '17', '21', '27', '36', '42', '108', '144', '369'],
  emotions: ['joy', 'calm', 'peace', 'love', 'hope', 'courage', 'clarity', 'harmony', 'serenity', 'gratitude', 'wonder', 'excitement', 'curiosity', 'confidence', 'compassion', 'trust', 'contentment', 'bliss', 'awe', 'delight', 'euphoria', 'tranquility', 'ecstasy', 'empathy', 'kindness', 'patience', 'wisdom', 'grace', 'devotion', 'passion', 'tenderness', 'acceptance', 'forgiveness', 'reverence', 'inspiration', 'fulfillment', 'freedom', 'balance', 'radiance', 'vitality'],
  locations: ['beach', 'mountain', 'forest', 'desert', 'city', 'lake', 'valley', 'island', 'river', 'canyon', 'temple', 'bridge', 'waterfall', 'meadow', 'volcano', 'glacier', 'oasis', 'cave', 'garden', 'field', 'ocean', 'jungle', 'plateau', 'cliff', 'dune', 'marsh', 'fjord', 'bay', 'lagoon', 'reef', 'tundra', 'savanna', 'prairie', 'grove', 'delta', 'gorge', 'peninsula', 'archipelago', 'monastery', 'lighthouse']
}
