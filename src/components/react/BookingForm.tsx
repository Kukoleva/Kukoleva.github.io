import { useState, type FormEvent } from 'react'

export interface BookingService {
  title: string
  price: number
}

interface Props {
  services: BookingService[]
  phone: string
  phoneDisplay: string
  whatsapp: string
  telegram: string
}

const inputCls =
  'w-full rounded-card border border-border bg-white px-4 py-3 outline-none transition placeholder:text-fg/40 focus:border-accent focus:ring-2 focus:ring-accent/25'

export default function BookingForm({ services, phone, phoneDisplay, whatsapp, telegram }: Props) {
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const lines = [
      'Заявка на запись с сайта Beauty Studio',
      `Имя: ${name}`,
      `Телефон: ${tel}`,
      service && `Услуга: ${service}`,
      date && `Дата: ${date}`,
      time && `Время: ${time}`,
      comment && `Комментарий: ${comment}`,
    ].filter(Boolean)
    window.open(`${whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
    setSent(true)
  }

  return (
    <section id="booking" className="relative overflow-hidden bg-plum px-4 py-14 text-white">
      <div aria-hidden="true" className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#b026ff]/35 blur-3xl" />
      <div className="relative mx-auto max-w-3xl">
        <h2 className="text-center font-serif text-3xl md:text-4xl">Записаться на приём</h2>
        <p className="mx-auto mt-3 max-w-lg text-center text-white/80">
          Заполните форму — заявка откроется в WhatsApp, останется нажать «отправить».
        </p>

        <form
          onSubmit={submit}
          className="mt-8 grid gap-4 rounded-card border border-white/60 bg-white/95 p-6 text-fg shadow-card backdrop-blur-xl sm:grid-cols-2"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">Ваше имя *</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Анна" className={inputCls} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">Телефон *</span>
            <input required type="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="+375 (__) ___-__-__" className={inputCls} />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-semibold">Услуга</span>
            <select value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
              <option value="">— Выберите услугу —</option>
              {services.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title} — {s.price} р
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">Желаемая дата</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold">Время</span>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
          </label>
          <label className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="text-sm font-semibold">Комментарий</span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Например: волнует чувствительность кожи"
              className={`${inputCls} resize-none`}
            />
          </label>
          <button
            type="submit"
            className="rounded-card bg-plum py-3.5 font-semibold text-white shadow-btn transition hover:bg-accent-dark hover:shadow-btn-hover sm:col-span-2"
          >
            Отправить заявку в WhatsApp →
          </button>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:col-span-2">
            <a href={telegram} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-dark hover:underline">
              ✈️ Написать в Telegram
            </a>
            <a href={`tel:${phone}`} className="font-semibold text-accent-dark hover:underline">
              📞 {phoneDisplay}
            </a>
          </div>
          {sent && (
            <p className="rounded-card bg-accent/15 px-4 py-3 text-center text-sm font-semibold text-accent-dark sm:col-span-2">
              Заявка подготовлена — проверьте открывшийся WhatsApp и нажмите «отправить».
            </p>
          )}
        </form>
      </div>
    </section>
  )
}