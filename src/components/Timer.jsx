import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createLoop } from '../utils/audio.js'

const DURATION = 60

const Timer = forwardRef(function Timer(_props, ref) {
  const [secondsLeft, setSecondsLeft] = useState(DURATION)
  const [status, setStatus] = useState('idle') //idle | running | done
  const intervalRef = useRef(null)
  const cronoAudioRef = useRef(null)

  function stopCrono() {
    if (cronoAudioRef.current) {
      cronoAudioRef.current.pause()
      cronoAudioRef.current.currentTime = 0
      cronoAudioRef.current = null
    }
  }

  useImperativeHandle(ref, () => ({ stopCrono }), [])

  useEffect(() => {
    if (status !== 'running') return
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current)
          setStatus('done')
          stopCrono()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [status])

  useEffect(
    () => () => {
      clearInterval(intervalRef.current)
      stopCrono()
    },
    [],
  )

  function handleClick() {
    clearInterval(intervalRef.current)
    stopCrono()
    setSecondsLeft(DURATION)
    setStatus('running')
    const audio = createLoop('crono-question.mp3')
    cronoAudioRef.current = audio
    audio.play().catch(() => {})
  }

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  return (
    <div className={`timer timer--${status}`}>
      <span className="timer-display" aria-live="polite">
        {minutes}:{seconds}
      </span>
      <button type="button" className="timer-button" onClick={handleClick}>
        {status === 'idle' ? '⏱️ Iniciar 1 min' : status === 'running' ? '🔁 Reiniciar' : '🔔 Reiniciar'}
      </button>
    </div>
  )
})

export default Timer
