# Beauty Studio — сайт кабинета косметолога (Astro)

Статический сайт-визитка на **Astro 7** (Content Collections + Tailwind CSS v4 + React-острова).
Оптимизирован под техническое SEO и Core Web Vitals.

Кабинет косметолога Куколевой Анастасии Геннадьевны в Гомеле:
г. Гомель, площадь Привокзальная, 1, гостиница «Гомель», 7 этаж, каб. 716.

## Запуск

```bash
npm install
npm run dev       # dev-сервер
npm run build     # сборка в dist/
npm run preview   # предпросмотр сборки
npm run check     # проверка типов (astro check)
```

## Структура

- `src/content.config.ts` — схемы коллекций (categories, services)
- `src/content/categories/` — 5 категорий (MD)
- `src/content/services/` — 21 услуга (MD)
- `src/layouts/Layout.astro` — общий SEO-шаблон: title, description, canonical, Open Graph, Twitter, JSON-LD
- `src/pages/` — роутинг: `index`, `404`, `services/index`, `services/[slug]`, `services/[category]/index`
- `src/components/` — Astro-компоненты: `Header` (нативное `<dialog>`), `Footer`, `Faq` (`<details>`), `Breadcrumbs`, `ServiceCard`
- `src/components/react/` — интерактивные острова: `BookingForm`, `Gallery` + `Lightbox`
- `src/lib/` — бизнес-данные, контент (отзывы/FAQ/галереи) и JSON-LD схемы (`BeautySalon`, `Service`, `FAQPage`, `BreadcrumbList`)
- `src/styles/global.css` — Tailwind v4 (`@theme`) и базовые стили
- `public/images/` — фотографии, favicon, robots, верификация Яндекса

## SEO

- 27 страниц: главная + 5 категорий + 21 услуга; плюс `/services/` (каталог) и `404`
- Автоматический `sitemap-index.xml` (интеграция `@astrojs/sitemap`)
- Структурированные данные: LocalBusiness (BeautySalon) + Service + Offer, FAQPage, BreadcrumbList, AggregateRating
- Оптимизация изображений через `astro:assets` (WebP/AVIF, width/height против CLS)

Старый React-код сохранён в папке `_legacy_react/`.
