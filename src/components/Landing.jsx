import IcesiLogo from './IcesiLogo.jsx'

export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <IcesiLogo />
      <div className="landing-card">
        <h1 className="landing-title">Quiz 2 Interactivo</h1>
        <button type="button" className="landing-start-button" onClick={() => onStart(1)}>
          Comenzar
          <span className="landing-level-detail">Unidad 2 - Conjuntos y funciones · 1 min</span>
        </button>
      </div>
    </div>
  )
}
