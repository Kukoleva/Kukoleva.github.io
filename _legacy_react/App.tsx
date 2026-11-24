import { useState } from 'react'
import { CallMenu } from './components/CallMenu'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Lightbox, type LightboxImage } from './components/Lightbox'
import { Home } from './pages/Home'

export default function App() {
  const [callOpen, setCallOpen] = useState(false)
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null)

  const onCall = () => setCallOpen(true)
  const onOpenLightbox = (images: LightboxImage[], index: number) =>
    setLightbox({ images, index })

  return (
    <div className="flex min-h-screen flex-col">
      <Header onCall={onCall} />
      <div className="flex-1">
        <Home onOpenLightbox={onOpenLightbox} />
      </div>
      <Footer />

      {/* Плавающая кнопка записи — только мобильные */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-bg/80 p-3 backdrop-blur-xl md:hidden">
        <a
          href="#booking"
          className="block rounded-card bg-gradient-to-r from-accent to-accent-dark py-3 text-center font-semibold text-white shadow-btn"
        >
          📞 Записаться на приём
        </a>
      </div>
      <div className="h-16 md:hidden" aria-hidden="true" />

      <CallMenu open={callOpen} onClose={() => setCallOpen(false)} />
      <Lightbox
        images={lightbox?.images ?? []}
        index={lightbox?.index ?? null}
        onClose={() => setLightbox(null)}
        onNavigate={(index) => setLightbox((s) => (s ? { ...s, index } : s))}
      />
    </div>
  )
}
