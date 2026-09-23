import { Fragment } from 'react'
import katex from 'katex'

// Divide el texto en segmentos normales y segmentos LaTeX delimitados por $...$,
// y renderiza estos últimos con KaTeX para que la notación matemática se vea
// como en LaTeX (fracciones, exponentes, conjuntos, ℝ/ℤ de pizarra, etc.).
function renderSegments(raw) {
  const parts = raw.split(/\$([^$]+)\$/g)
  return parts.map((part, i) => {
    const isMath = i % 2 === 1
    if (!isMath) return { type: 'text', value: part }
    const html = katex.renderToString(part, {
      throwOnError: false,
      output: 'html',
    })
    return { type: 'math', html }
  })
}

function renderLineContent(line, key) {
  const segments = renderSegments(line)
  return segments.map((seg, si) =>
    seg.type === 'math' ? (
      <span key={`${key}-${si}`} dangerouslySetInnerHTML={{ __html: seg.html }} />
    ) : (
      <Fragment key={`${key}-${si}`}>{seg.value}</Fragment>
    ),
  )
}

// Para una sola línea, no se envuelve en un <div> interno: así MathText
// puede usarse inline (as="span") sin generar HTML de bloque inválido
// dentro de elementos en línea, como las etiquetas de los diagramas.
export default function MathText({ text, as: Tag = 'div' }) {
  const lines = text.split('\n')

  if (lines.length === 1) {
    return <Tag className="math-text">{renderLineContent(lines[0], 0)}</Tag>
  }

  return (
    <Tag className="math-text">
      {lines.map((line, li) => (
        <div className={line.trim() === '' ? 'math-line math-line--blank' : 'math-line'} key={li}>
          {renderLineContent(line, li)}
        </div>
      ))}
    </Tag>
  )
}
