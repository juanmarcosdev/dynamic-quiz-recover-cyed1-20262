export default function CardTile({ number, isSelected, isRevealed, onSelect }) {
  const classes = ['card-tile']
  if (isSelected) classes.push('is-selected')
  if (isRevealed) classes.push('is-revealed')

  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={onSelect}
      aria-pressed={isSelected}
      aria-label={`Pregunta ${number}${isRevealed ? ', ya revelada' : ''}`}
    >
      <span className="card-tile-number">{number}</span>
      {isRevealed && <span className="card-tile-check">✓</span>}
    </button>
  )
}
