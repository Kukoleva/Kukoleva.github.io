// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  // От этого домена строятся canonical, Open Graph и sitemap
  site: 'https://kukoleva.github.io',
  // User-сайт GitHub Pages (репозиторий kukoleva.github.io) размещается в корне
  base: '/',
  integrations: [
    react(),
    sitemap({
      // не отдаём 404 в карту сайта
      filter: (page) => !page.includes('/404'),
      entryLimit: 500,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  // Мгновенная навигация: предзагрузка внутренних страниц при наведении
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
})