import { useEffect, useState } from 'react'
import { CallMenu } from './components/CallMenu'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Lightbox, type LightboxImage } from './components/Lightbox'
import { Home } from './pages/Home'
import { Prices } from './pages/Prices'

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash.startsWith('#/') ? hash : '#/'
}

export default function App() {
  const route = useHashRoute()
  const [callOpen, setCallOpen] = useState(false)
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null)

  const onCall = () => setCallOpen(true)
  const onOpenLightbox = (images: LightboxImage[], index: number) =>
    setLightbox({ images, index })

  return (
    <div className="flex min-h-screen flex-col">
      <Header onCall={onCall} />
      <div className="flex-1">
        {route === '#/prices' ? (
          <Prices onCall={onCall} />
        ) : (
          <Home onCall={onCall} onOpenLightbox={onOpenLightbox} />
        )}
      </div>
      <Footer />
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
