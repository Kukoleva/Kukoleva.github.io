import { useEffect } from 'react'
import { site } from '../site'

const links = [
  { label: '📞 Позвонить', href: `tel:${site.phone}` },
  { label: '💬 WhatsApp', href: site.socials.whatsapp, external: true },
  { label: '✈️ Telegram', href: site.socials.telegram, external: true },
  { label: '📸 Instagram', href: site.socials.instagram, external: true },
  { label: '🎵 TikTok', href: site.socials.tiktok, external: true },
]

export function CallMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Связаться с нами"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs rounded-card bg-card p-6 text-center shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4 font-serif text-2xl text-plum">Связаться с нами</p>
        <div className="flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="rounded-card border border-border px-4 py-3 font-semibold text-plum transition hover:border-accent hover:bg-accent/10"
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-card bg-plum py-3 font-semibold text-white transition hover:bg-accent-dark"
        >
          Закрыть
        </button>
      </div>
    </div>
  )
}
