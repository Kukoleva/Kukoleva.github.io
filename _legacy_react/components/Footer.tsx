import { site } from '../site'

const socials = [
  { label: 'Telegram', href: site.socials.telegram },
  { label: 'WhatsApp', href: site.socials.whatsapp },
  { label: 'Instagram', href: site.socials.instagram },
  { label: 'TikTok', href: site.socials.tiktok },
]

export function Footer() {
  return (
    <footer className="bg-plum py-10 text-center text-white">
      <p className="font-serif text-2xl">{site.brand}</p>
      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/80">
        г. Гомель, площадь Привокзальная, 1<br />
        гостиница «Гомель», 7 этаж, каб. 716
      </p>
      <nav className="mt-5 flex flex-wrap justify-center gap-4" aria-label="Социальные сети">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-card border border-white/25 px-4 py-2 text-sm font-semibold transition hover:border-accent hover:bg-accent"
          >
            {s.label}
          </a>
        ))}
      </nav>
      <p className="mt-6 text-xs text-white/60">© 2026 {site.brand}. Все права защищены.</p>
    </footer>
  )
}
