import { useRef, useState } from 'react'
import Lightbox, { type GalleryImage } from './Lightbox'

interface Props {
  images: GalleryImage[]
  label?: string
}

export default function Gallery({ images, label = 'Галерея' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState<number | null>(null)

  const scrollBy = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className="relative" role="region" aria-label={label}>
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Прокрутить влево"
        className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-btn text-2xl text-white shadow-btn transition hover:bg-btn-dark md:flex"
      >
        ‹
      </button>

      <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 py-4">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setIndex(i)}
            className="shrink-0 snap-center overflow-hidden rounded-card bg-card shadow-card transition hover:-translate-y-1"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-72 w-64 object-cover transition duration-500 hover:scale-105 md:h-96 md:w-80"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Прокрутить вправо"
        className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-btn text-2xl text-white shadow-btn transition hover:bg-btn-dark md:flex"
      >
        ›
      </button>

      {index !== null && (
        <Lightbox
          images={images}
          index={index}
          onClose={() => setIndex(null)}
          onNavigate={(i) => setIndex(i)}
        />
      )}
    </div>
  )
}