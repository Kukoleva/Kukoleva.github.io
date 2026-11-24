// ===== Бизнес-данные Beauty Studio (Гомель) =====
export const site = {
  brand: 'Beauty Studio',
  tagline: 'Кабинет эстетической косметологии в Гомеле',
  legalName: 'Beauty Studio — кабинет эстетической косметологии',
  url: 'https://kukoleva.github.io',
  defaultImage: '/images/IMG22.webp',
  phone: '+375291770822',
  phoneDisplay: '+375 (29) 177-08-22',
  address: {
    lines: ['г. Гомель,', 'площадь Привокзальная, 1', 'гостиница «Гомель»,', '7 этаж, каб. 716'],
    street: 'пл. Привокзальная, 1, гостиница «Гомель», 7 этаж, каб. 716',
    locality: 'Гомель',
    postalCode: '246000',
    country: 'BY',
  },
  hours: 'По предварительной записи',
  geo: { latitude: 52.431244, longitude: 30.992874 },
  mapUrl:
    'https://yandex.by/maps/?ll=30.992874,52.431244&z=17&text=гостиница%20Гомель',
  mapEmbed:
    'https://yandex.ru/map-widget/v1/?ll=30.992874%2C52.431244&mode=whatshere&whatshere%5Bpoint%5D=30.992874%2C52.431244&whatshere%5Bzoom%5D=17&z=17',
  specialist: {
    name: 'Куколева Анастасия Геннадьевна',
    rank: 'Косметолог-эстетист 5-й разряд',
    extra: 'Специалист по косметической химии',
  },
  socials: {
    telegram: 'https://t.me/kukoleva_cosmetology/',
    whatsapp: 'https://wa.me/375291770822',
    instagram: 'https://instagram.com/kukoleva_cosmetology/',
    tiktok: 'https://www.tiktok.com/@kukoleva_cosmetology?_r=1',
  },
  rating: { value: 5, count: 21 },
  quote: {
    accent: 'Здоровье кожи',
    line1: 'начинается с дисциплины,',
    line2: 'а не с волшебной баночки.',
    tail: 'Станьте регулярным клиентом, а не случайным гостем!',
  },
} as const

export const advantages = [
  {
    icon: '🎓',
    title: 'Дипломированный специалист',
    text: 'Косметолог-эстетист 5-го разряда, специалист по косметической химии',
  },
  {
    icon: '🧪',
    title: 'Профессиональная косметика',
    text: 'CHRISTINA, ARKANA и другие проверенные бренды',
  },
  {
    icon: '✨',
    title: 'Индивидуальный подход',
    text: 'Программа подбирается по типу и состоянию кожи после консультации',
  },
  {
    icon: '📍',
    title: 'Центр города',
    text: 'Гостиница «Гомель», 7 этаж, каб. 716 — рядом с вокзалом',
  },
]

// ===== Общая SEO-разметка (LocalBusiness) — одинакова на всех страницах =====
export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'BeautySalon',
  name: site.brand,
  legalName: site.legalName,
  description:
    'Кабинет эстетической косметологии в Гомеле: чистка лица, пилинги, массаж, микронидлинг, комплексные программы.',
  telephone: site.phone,
  url: site.url,
  image: site.url + site.defaultImage,
  priceRange: '$$',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    hoursAvailable: site.hours,
  },
  sameAs: [site.socials.instagram, site.socials.tiktok, site.socials.telegram],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: 5,
  },
}

// ===== Разметка конкретной услуги (Service + Offer) =====
export const serviceSchema = (s: { title: string; description: string; price: number }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.title,
  serviceType: s.title,
  description: s.description,
  provider: {
    '@type': 'BeautySalon',
    name: site.brand,
    telephone: site.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Гомель', addressCountry: 'BY' },
  },
  areaServed: { '@type': 'City', name: 'Гомель' },
  offers: {
    '@type': 'Offer',
    price: String(s.price),
    priceCurrency: 'BYN',
    availability: 'https://schema.org/InStock',
  },
})

// ===== Разметка FAQ (rich snippet) =====
export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({
    '@type': 'Question',
    name: i.q,
    acceptedAnswer: { '@type': 'Answer', text: i.a },
  })),
})

// ===== Разметка хлебных крошек =====
export const breadcrumbSchema = (items: { name: string; url?: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((i, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: i.name,
    ...(i.url ? { item: i.url } : {}),
  })),
})