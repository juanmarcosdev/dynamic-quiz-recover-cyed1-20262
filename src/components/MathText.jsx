import { Fragment } from 'react'
import katex from 'katex'

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

//línea única sin <div> interno: permite usar as="span" en contextos inline.
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
