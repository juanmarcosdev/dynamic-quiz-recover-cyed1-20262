import IcesiLogo from './IcesiLogo.jsx'

export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <IcesiLogo />
      <div className="landing-card">
        <h1 className="landing-title">Quiz 2 Interactivo</h1>
        <p className="landing-subtitle">Unidad 2 - Conjuntos y funciones</p>
        <button type="button" className="landing-start-button" onClick={onStart}>
          Iniciar juego
        </button>
      </div>
    </div>
  )
}
