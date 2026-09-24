import icesiLogo from '../assets/icesi-logo.png'

//va en una placa blanca fija porque el logo es azul y una de las dos
//pantallas (landing) tiene fondo azul: así se ve bien en ambas.
export default function IcesiLogo() {
  return (
    <div className="icesi-logo-badge">
      <img src={icesiLogo} alt="Universidad Icesi" className="icesi-logo" />
    </div>
  )
}
