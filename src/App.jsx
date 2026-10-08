import { useMemo, useState } from 'react'
import { questions } from './data/questions.js'
import CardTile from './components/CardTile.jsx'
import QuestionPanel from './components/QuestionPanel.jsx'
import Dialog from './components/Dialog.jsx'
import Landing from './components/Landing.jsx'
import IcesiLogo from './components/IcesiLogo.jsx'

const LEVELS = {
  1: { title: 'Quiz 2 - CyED1', questions, timerDuration: 60 },
}

export default function App() {
  const [view, setView] = useState('landing') //'landing' | 'game'
  const [level, setLevel] = useState(1)
  const [selectedId, setSelectedId] = useState(null)
  const [revealedByLevel, setRevealedByLevel] = useState(() => ({ 1: new Set() }))

  const config = LEVELS[level]
  const revealedIds = revealedByLevel[level]

  const selectedQuestion = useMemo(
    () => config.questions.find((q) => q.id === selectedId) ?? null,
    [config, selectedId],
  )

  function handleToggleReveal() {
    if (selectedId == null) return
    setRevealedByLevel((prev) => {
      const next = new Set(prev[level])
      if (next.has(selectedId)) {
        next.delete(selectedId)
      } else {
        next.add(selectedId)
      }
      return { ...prev, [level]: next }
    })
  }

  function handleReset() {
    setSelectedId(null)
    setRevealedByLevel((prev) => ({ ...prev, [level]: new Set() }))
  }

  function handleStart(nextLevel) {
    setLevel(nextLevel)
    setSelectedId(null)
    setView('game')
  }

  if (view === 'landing') {
    return <Landing onStart={handleStart} />
  }

  const renderTile = (q) => (
    <CardTile
      key={q.id}
      number={q.id}
      isSelected={q.id === selectedId}
      isRevealed={revealedIds.has(q.id)}
      onSelect={() => setSelectedId(q.id)}
    />
  )

  return (
    <div className="app">
      <IcesiLogo />
      <header className="app-header">
        <h1>{config.title}</h1>
        <div className="app-progress">
          <span>
            {revealedIds.size} / {config.questions.length} reveladas
          </span>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reiniciar actividad
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="card-mesh" aria-label="Malla de preguntas">
          {config.questions.map(renderTile)}
        </section>
      </main>

      <Dialog
        open={selectedQuestion != null}
        onClose={() => setSelectedId(null)}
      >
        <QuestionPanel
          question={selectedQuestion}
          revealed={selectedQuestion ? revealedIds.has(selectedQuestion.id) : false}
          onReveal={handleToggleReveal}
          onClose={() => setSelectedId(null)}
          timerDuration={config.timerDuration}
        />
      </Dialog>
    </div>
  )
}
