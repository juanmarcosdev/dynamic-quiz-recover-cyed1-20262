import { useMemo, useState } from 'react'
import { questions } from './data/questions.js'
import CardTile from './components/CardTile.jsx'
import QuestionPanel from './components/QuestionPanel.jsx'
import Dialog from './components/Dialog.jsx'
import Landing from './components/Landing.jsx'
import IcesiLogo from './components/IcesiLogo.jsx'

export default function App() {
  const [view, setView] = useState('landing') // 'landing' | 'game'
  const [selectedId, setSelectedId] = useState(null)
  const [revealedIds, setRevealedIds] = useState(() => new Set())

  const selectedQuestion = useMemo(
    () => questions.find((q) => q.id === selectedId) ?? null,
    [selectedId],
  )

  function handleToggleReveal() {
    if (selectedId == null) return
    setRevealedIds((prev) => {
      const next = new Set(prev)
      if (next.has(selectedId)) {
        next.delete(selectedId)
      } else {
        next.add(selectedId)
      }
      return next
    })
  }

  function handleReset() {
    setSelectedId(null)
    setRevealedIds(new Set())
  }

  if (view === 'landing') {
    return <Landing onStart={() => setView('game')} />
  }

  return (
    <div className="app">
      <IcesiLogo />
      <header className="app-header">
        <h1>Recuperación - Quiz 2 CyED1</h1>
        <div className="app-progress">
          <span>
            {revealedIds.size} / {questions.length} reveladas
          </span>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reiniciar actividad
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="card-mesh" aria-label="Malla de preguntas">
          {questions.map((q) => (
            <CardTile
              key={q.id}
              number={q.id}
              isSelected={q.id === selectedId}
              isRevealed={revealedIds.has(q.id)}
              onSelect={() => setSelectedId(q.id)}
            />
          ))}
        </section>
      </main>

      <Dialog open={selectedQuestion != null} onClose={() => setSelectedId(null)}>
        <QuestionPanel
          question={selectedQuestion}
          revealed={selectedQuestion ? revealedIds.has(selectedQuestion.id) : false}
          onReveal={handleToggleReveal}
          onClose={() => setSelectedId(null)}
        />
      </Dialog>
    </div>
  )
}
