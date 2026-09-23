import { useEffect, useRef } from 'react'

export default function Dialog({ open, onClose, children }) {
  const backdropRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="dialog-backdrop"
      ref={backdropRef}
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) onClose()
      }}
    >
      <div className="dialog-surface" role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  )
}
