import IcesiLogo from './IcesiLogo.jsx'

export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <IcesiLogo />
      <div className="landing-card">
        <h1 className="landing-title">Quiz Interactivo</h1>
        <p className="landing-subtitle">Elige un nivel</p>
        <div className="landing-levels">
          <button type="button" className="landing-start-button" onClick={() => onStart(1)}>
            Nivel 1 - Quiz 2 CyED1
            <span className="landing-level-detail">Unidad 2 - Conjuntos y funciones - 1 min</span>
          </button>
          <button type="button" className="landing-start-button" onClick={() => onStart(2)}>
            Sustentación CyED3 - Generales
            <span className="landing-level-detail">40 preguntas comunes a todos los trabajos - 2 min</span>
          </button>
          <button
            type="button"
            className="landing-start-button landing-start-button--starred"
            onClick={() => onStart(3)}
          >
            Sustentación CyED3 - Específicas ★
            <span className="landing-level-detail">Preguntas sobre el trabajo de cada código - 2 min</span>
          </button>
          <button type="button" className="landing-start-button" onClick={() => onStart(4)}>
            Seguimiento 6 - 1 Pregunta de la TI
            <span className="landing-level-detail">28 preguntas de la TI2 (GoEmotions, RNN y BERT) - 2 min</span>
          </button>
        </div>
      </div>
    </div>
  )
}
