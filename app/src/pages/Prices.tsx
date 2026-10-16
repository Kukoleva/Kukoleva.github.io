import { prices } from '../site'

export function Prices({ onCall }: { onCall: () => void }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <a href="#/" className="font-semibold text-accent-dark hover:underline">
        ← На главную
      </a>
      <h1 className="mt-4 text-center font-serif text-4xl text-plum">Наши цены</h1>
      <p className="mt-3 text-center text-fg/70">
        Выберите подходящую услугу и свяжитесь с нами для записи.
      </p>

      {/* Десктоп: таблица */}
      <div className="mt-8 hidden overflow-hidden rounded-card bg-card shadow-card md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-plum text-left text-white">
              <th className="px-5 py-4 font-semibold">Описание</th>
              <th className="w-28 px-5 py-4 font-semibold">Цена</th>
              <th className="w-36 px-5 py-4 font-semibold">Действие</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p) => (
              <tr key={p.title} className="border-t border-border align-top">
                <td className="px-5 py-4">
                  <p className="font-semibold">{p.title}</p>
                  {p.details && <p className="mt-1 text-sm text-fg/70">{p.details}</p>}
                </td>
                <td className="px-5 py-4">
                  <span className="text-lg font-bold text-accent-dark">{p.price} р</span>
                </td>
                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={onCall}
                    className="rounded-card bg-plum px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark"
                  >
                    Записаться →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Мобайл: карточки */}
      <div className="mt-6 flex flex-col gap-4 md:hidden">
        {prices.map((p) => (
          <div key={p.title} className="rounded-card border border-border bg-card p-4 shadow-card">
            <p className="font-semibold">{p.title}</p>
            {p.details && <p className="mt-1 text-sm text-fg/70">{p.details}</p>}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-lg font-bold text-accent-dark">{p.price} р</span>
              <button
                type="button"
                onClick={onCall}
                className="rounded-card bg-plum px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-dark"
              >
                Записаться →
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
