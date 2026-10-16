import { useCallback, useEffect, useRef, useState } from 'react'

export interface LightboxImage {
  src: string
  alt: string
}

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[]
  index: number | null
  onClose: () => void
  onNavigate: (i: number) => void
}) {
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)

  const reset = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  const clampScale = (s: number) => Math.min(5, Math.max(0.5, s))
  const zoom = (dir: number) => setScale((s) => clampScale(s + dir * 0.25))

  const prev = useCallback(() => {
    if (index === null || images.length === 0) return
    onNavigate((index - 1 + images.length) % images.length)
    reset()
  }, [index, images.length, onNavigate, reset])

  const next = useCallback(() => {
    if (index === null || images.length === 0) return
    onNavigate((index + 1) % images.length)
    reset()
  }, [index, images.length, onNavigate, reset])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === '+' || e.key === '=') zoom(1)
      if (e.key === '-') zoom(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, onClose, prev, next])

  if (index === null || !images[index]) return null
  const image = images[index]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр изображения"
      onWheel={(e) => {
        e.preventDefault()
        setScale((s) => clampScale(s + (e.deltaY < 0 ? 0.2 : -0.2)))
      }}
      onPointerDown={(e) => {
        drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!drag.current) return
        setOffset({
          x: drag.current.ox + e.clientX - drag.current.x,
          y: drag.current.oy + e.clientY - drag.current.y,
        })
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerCancel={() => (drag.current = null)}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть просмотр"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/25"
      >
        ✕
      </button>
      <button
        type="button"
        onClick={prev}
        aria-label="Предыдущее фото"
        className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/25"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Следующее фото"
        className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/25"
      >
        ›
      </button>

      <img
        src={image.src}
        alt={image.alt}
        draggable={false}
        className="max-h-[85vh] max-w-[90vw] select-none rounded-card object-contain"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          cursor: scale > 1 ? 'grab' : 'zoom-in',
        }}
        onClick={() => scale === 1 && setScale(2)}
      />

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-white">
        <button
          type="button"
          onClick={() => zoom(-1)}
          aria-label="Уменьшить"
          className="h-8 w-8 rounded-full text-xl transition hover:bg-white/20"
        >
          −
        </button>
        <span className="w-12 text-center text-sm">{Math.round(scale * 100)}%</span>
        <button
          type="button"
          onClick={() => zoom(1)}
          aria-label="Увеличить"
          className="h-8 w-8 rounded-full text-xl transition hover:bg-white/20"
        >
          +
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Сбросить масштаб"
          className="rounded-full px-2 text-sm transition hover:bg-white/20"
        >
          1:1
        </button>
      </div>
    </div>
  )
}
