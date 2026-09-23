// Reproduce los .mp3 propios del usuario en public/audios/.
// BASE_URL respeta el `base` de vite.config.js (necesario cuando la app
// vive en una subruta, como en GitHub Pages: /repo-name/).
const AUDIO_BASE = `${import.meta.env.BASE_URL}audios/`

export function playOnce(filename, { volume = 1 } = {}) {
  try {
    const audio = new Audio(AUDIO_BASE + filename)
    audio.volume = volume
    audio.play().catch(() => {})
    return audio
  } catch {
    return null
  }
}

export function createLoop(filename, { volume = 1 } = {}) {
  const audio = new Audio(AUDIO_BASE + filename)
  audio.loop = true
  audio.volume = volume
  return audio
}
