import IcesiLogo from './IcesiLogo.jsx'

export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <IcesiLogo />
      <div className="landing-card">
        <h1 className="landing-title">Quiz 2 Interactivo</h1>
        <p className="landing-subtitle">Elige un nivel</p>
        <div className="landing-levels">
          <button type="button" className="landing-start-button" onClick={() => onStart(1)}>
            Nivel 1
            <span className="landing-level-detail">Unidad 2 - Conjuntos y funciones · 1 min</span>
          </button>
          <button type="button" className="landing-start-button" onClick={() => onStart(2)}>
            Nivel 2
            <span className="landing-level-detail">Tarea Integradora (SGMMS) · 2 min</span>
          </button>
        </div>
      </div>
    </div>
  )
}
