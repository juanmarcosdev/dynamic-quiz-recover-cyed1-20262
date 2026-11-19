import { useMemo, useState } from 'react'
import { questions } from './data/questions.js'
import { sustentacionQuestions } from './data/sustentacionQuestions.js'
import { seguimiento6Questions } from './data/seguimiento6Questions.js'
import { sustentacionStudents, starredQuestions } from './data/sustentacionStudents.js'
import CardTile from './components/CardTile.jsx'
import QuestionPanel from './components/QuestionPanel.jsx'
import Dialog from './components/Dialog.jsx'
import Landing from './components/Landing.jsx'
import IcesiLogo from './components/IcesiLogo.jsx'

//nivel 2: banco general de la sustentación; nivel 3: preguntas específicas por código.
const LEVELS = {
  1: { title: 'Quiz 2 - CyED1', timerDuration: 60, grouped: false },
  2: { title: 'Sustentación CyED3 - Preguntas generales', timerDuration: 120, grouped: true },
  3: { title: 'Sustentación CyED3 - Preguntas específicas', timerDuration: 120, grouped: false },
  4: { title: 'Seguimiento 6 - 1 Pregunta de la TI', timerDuration: 120, grouped: false },
}

//agrupa por tema conservando el orden de aparición.
function groupByTopic(list) {
  const groups = []
  for (const q of list) {
    const last = groups[groups.length - 1]
    if (last && last.topic === q.topic) last.items.push(q)
    else groups.push({ topic: q.topic, items: [q] })
  }
  return groups
}

export default function App() {
  const [view, setView] = useState('landing') //'landing' | 'game'
  const [level, setLevel] = useState(1)
  const [selectedId, setSelectedId] = useState(null)
  const [studentCode, setStudentCode] = useState('')
  //las reveladas se conservan al cambiar de pantalla o de estudiante: así se ve qué preguntas ya salieron.
  const [revealedByLevel, setRevealedByLevel] = useState(() => ({ 1: new Set(), 2: new Set(), 3: new Set(), 4: new Set() }))

  const config = LEVELS[level]
  const revealedIds = revealedByLevel[level]

  const student = useMemo(
    () => sustentacionStudents.find((s) => s.code === studentCode) ?? null,
    [studentCode],
  )

  const levelQuestions = useMemo(() => {
    if (level === 1) return questions
    if (level === 2) return sustentacionQuestions
    if (level === 4) return seguimiento6Questions
    return starredQuestions(student)
  }, [level, student])

  const selectedQuestion = useMemo(
    () => levelQuestions.find((q) => q.id === selectedId) ?? null,
    [levelQuestions, selectedId],
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

  function handleStudentChange(code) {
    setStudentCode(code)
    setSelectedId(null)
  }

  if (view === 'landing') {
    return <Landing onStart={handleStart} />
  }

  const renderTile = (q) => (
    <CardTile
      key={q.id}
      number={q.label ?? q.id}
      starred={q.starred}
      isSelected={q.id === selectedId}
      isRevealed={revealedIds.has(q.id)}
      onSelect={() => setSelectedId(q.id)}
    />
  )

  const revealedHere = levelQuestions.filter((q) => revealedIds.has(q.id)).length

  return (
    <div className="app">
      <IcesiLogo />
      <header className="app-header">
        <h1>{config.title}</h1>
        <div className="app-progress">
          <span>
            {revealedHere} / {levelQuestions.length} reveladas
          </span>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reiniciar actividad
          </button>
          <button type="button" className="reset-button" onClick={() => setView('landing')}>
            Cambiar nivel
          </button>
        </div>
        {level === 3 && (
          <label className="student-picker">
            <span>Código del estudiante</span>
            <select value={studentCode} onChange={(e) => handleStudentChange(e.target.value)}>
              <option value="">Elige un código…</option>
              {sustentacionStudents.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code} - {s.month}
                </option>
              ))}
            </select>
          </label>
        )}
      </header>

      <main className="app-main">
        {level === 2 &&
          groupByTopic(levelQuestions).map((group) => (
            <section key={group.topic} className="card-group" aria-label={group.topic}>
              <h2 className="card-group-title">{group.topic}</h2>
              <div className="card-mesh card-mesh--wide">{group.items.map(renderTile)}</div>
            </section>
          ))}

        {level === 3 &&
          (student ? (
            <section className="card-group card-group--starred" aria-label="Preguntas específicas">
              <h2 className="card-group-title">
                ★ {student.code} - mes asignado {student.month}
              </h2>
              <div className="card-mesh card-mesh--wide">{levelQuestions.map(renderTile)}</div>
            </section>
          ) : (
            <p className="student-empty">Elige el código que salió en la ruleta para ver sus preguntas.</p>
          ))}

        {(level === 1 || level === 4) && (
          <section className={level === 4 ? 'card-mesh card-mesh--wide' : 'card-mesh'} aria-label="Malla de preguntas">
            {levelQuestions.map(renderTile)}
          </section>
        )}
      </main>

      <Dialog open={selectedQuestion != null} onClose={() => setSelectedId(null)} wide={level !== 1}>
        <QuestionPanel
          question={selectedQuestion}
          revealed={selectedQuestion ? revealedIds.has(selectedQuestion.id) : false}
          onReveal={handleToggleReveal}
          onClose={() => setSelectedId(null)}
          timerDuration={config.timerDuration}
          autoHeight={level !== 1}
        />
      </Dialog>
    </div>
  )
}
