import MathText from './MathText.jsx'

const WIDTH = 380
const HEIGHT = 320
const OVAL_RX = 70
const OVAL_RY = 110
const LEFT_CX = 100
const RIGHT_CX = 280
const CY = 180
const LABEL_Y = 26
const TOP_PAD = 95
const BOTTOM_PAD = 45

function pointPositions(items, cx) {
  const usableHeight = HEIGHT - TOP_PAD - BOTTOM_PAD
  return items.map((label, i) => {
    const y =
      items.length === 1
        ? CY
        : TOP_PAD + (usableHeight * i) / (items.length - 1)
    return { label, x: cx, y }
  })
}

export default function MappingDiagram({ domain, codomain, pairs }) {
  const domainPoints = pointPositions(domain, LEFT_CX)
  const codomainPoints = pointPositions(codomain, RIGHT_CX)
  const findPoint = (points, label) => points.find((p) => p.label === label)

  return (
    <div className="mapping-diagram-wrap" style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
      <svg
        className="mapping-diagram"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Diagrama de flechas entre dominio y codominio"
      >
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--diagram-arrow)" />
          </marker>
        </defs>

        <ellipse cx={LEFT_CX} cy={CY} rx={OVAL_RX} ry={OVAL_RY} className="mapping-oval" />
        <ellipse cx={RIGHT_CX} cy={CY} rx={OVAL_RX} ry={OVAL_RY} className="mapping-oval" />

        <text x={LEFT_CX} y={LABEL_Y} className="mapping-set-label" textAnchor="middle">
          Dominio
        </text>
        <text x={RIGHT_CX} y={LABEL_Y} className="mapping-set-label" textAnchor="middle">
          Codominio
        </text>

        {pairs.map(([d, c], i) => {
          const p1 = findPoint(domainPoints, d)
          const p2 = findPoint(codomainPoints, c)
          if (!p1 || !p2) return null
          return (
            <line
              key={`${d}-${c}-${i}`}
              x1={p1.x + 10}
              y1={p1.y}
              x2={p2.x - 12}
              y2={p2.y}
              className="mapping-arrow"
              markerEnd="url(#arrowhead)"
            />
          )
        })}

        {[...domainPoints, ...codomainPoints].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} className="mapping-dot" />
        ))}
      </svg>

      {domainPoints.map((p) => (
        <div
          key={`d-${p.label}`}
          className="mapping-point-label mapping-point-label--domain"
          style={{ left: `${(p.x / WIDTH) * 100}%`, top: `${(p.y / HEIGHT) * 100}%` }}
        >
          <MathText text={`$${p.label}$`} as="span" />
        </div>
      ))}
      {codomainPoints.map((p) => (
        <div
          key={`c-${p.label}`}
          className="mapping-point-label mapping-point-label--codomain"
          style={{ left: `${(p.x / WIDTH) * 100}%`, top: `${(p.y / HEIGHT) * 100}%` }}
        >
          <MathText text={`$${p.label}$`} as="span" />
        </div>
      ))}
    </div>
  )
}
