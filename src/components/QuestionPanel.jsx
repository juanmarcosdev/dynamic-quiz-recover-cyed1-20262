import { useEffect, useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import MappingDiagram from './MappingDiagram.jsx'
import MathText from './MathText.jsx'
import Timer from './Timer.jsx'
import { classifyMapping } from '../utils/classifyMapping.js'
import { playOnce } from '../utils/audio.js'

function diagramExplanation(question) {
  const { domain, codomain, pairs } = question
  const result = classifyMapping(domain, codomain, pairs)
  const lines = []

  if (!result.isFunction) {
    if (result.doubleArrow) {
      lines.push(
        `No es función: el elemento $${result.doubleArrow}$ del dominio tiene más de una flecha saliente.`,
      )
    }
    if (result.noArrow) {
      lines.push(
        `No es función: el elemento $${result.noArrow}$ del dominio no tiene ninguna flecha saliente.`,
      )
    }
    lines.push('Al no ser función, no se clasifica como inyectiva, sobreyectiva ni biyectiva.')
  } else {
    lines.push('Es función: cada elemento del dominio tiene exactamente una flecha saliente.')
    lines.push(
      `Inyectiva: ${result.isInjective ? 'Sí' : 'No'}` +
        (result.isInjective ? '' : ' (algún elemento del codominio recibe más de una flecha).'),
    )
    lines.push(
      `Sobreyectiva: ${result.isSurjective ? 'Sí' : 'No'}` +
        (result.isSurjective ? '' : ' (algún elemento del codominio no recibe ninguna flecha).'),
    )
    lines.push(`Biyectiva: ${result.isBijective ? 'Sí' : 'No'}.`)
  }
  return lines.join('\n')
}

export default function QuestionPanel({ question, revealed, onReveal, onClose }) {
  const timerRef = useRef(null)

  const { transform, opacity } = useSpring({
    opacity: revealed ? 1 : 0,
    transform: `perspective(1600px) rotateY(${revealed ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })

  useEffect(() => {
    if (!question) return
    playOnce('opening-question.mp3')
  }, [question])

  if (!question) return null

  const answerText = question.type === 'diagram' ? diagramExplanation(question) : question.answer

  return (
    <div className="question-panel">
      <div className="question-panel-header">
        <span className={`question-badge question-badge--${question.type}`}>
          #{question.id} - {question.topic}
        </span>
        <button type="button" className="close-button" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
      </div>

      <Timer key={question.id} ref={timerRef} />

      <div className={`flip-card${question.type === 'diagram' ? ' flip-card--diagram' : ''}`}>
        <animated.div
          className="flip-face flip-front"
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <MathText text={question.prompt} as="div" />
          {question.type === 'diagram' && (
            <MappingDiagram
              domain={question.domain}
              codomain={question.codomain}
              pairs={question.pairs}
            />
          )}
        </animated.div>

        <animated.div
          className="flip-face flip-back"
          style={{
            opacity,
            transform: transform.to((t) => `${t} rotateY(180deg)`),
          }}
        >
          <span className="answer-label">Respuesta</span>
          <MathText text={answerText} as="div" />
        </animated.div>
      </div>

      {!revealed ? (
        <button type="button" className="reveal-button" onClick={onReveal}>
          Revelar respuesta
        </button>
      ) : (
        <button type="button" className="reveal-button reveal-button--secondary" onClick={onReveal}>
          Ocultar respuesta
        </button>
      )}

      <div className="grade-buttons">
        <button
          type="button"
          className="grade-button grade-button--correct"
          onClick={() => {
            timerRef.current?.stopCrono()
            playOnce('correct.mp3')
          }}
          aria-label="Marcar respuesta correcta"
        >
          ✅
        </button>
        <button
          type="button"
          className="grade-button grade-button--wrong"
          onClick={() => {
            timerRef.current?.stopCrono()
            playOnce('wrong.mp3')
          }}
          aria-label="Marcar respuesta incorrecta"
        >
          ❌
        </button>
      </div>
    </div>
  )
}
