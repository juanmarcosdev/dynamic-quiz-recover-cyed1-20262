import { tiRequirements } from '../data/tiQuestions.js'

const LETTERS = ['A', 'B', 'C', 'D']

//cara frontal: texto literal de la TI (si aplica), enunciado y opciones.
export function TiPrompt({ question }) {
  return (
    <div className="ti-prompt">
      {question.refs.map((key) => {
        const req = tiRequirements[key]
        return (
          <blockquote key={key} className="ti-requirement">
            <span className="ti-requirement-title">{req.title}</span>
            {req.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </blockquote>
        )
      })}
      <p className="ti-question-text">{question.prompt}</p>
      <ol className="ti-options">
        {question.options.map((opt, i) => (
          <li key={i} className="ti-option">
            <span className="ti-option-letter">{LETTERS[i]}</span>
            <span>{opt}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

//cara trasera: opción correcta y retroalimentación.
export function TiAnswer({ question }) {
  return (
    <div className="ti-answer">
      <p className="ti-option ti-option--correct">
        <span className="ti-option-letter">{LETTERS[question.correct]}</span>
        <span>{question.options[question.correct]}</span>
      </p>
      <p className="ti-feedback">{question.feedback}</p>
    </div>
  )
}
