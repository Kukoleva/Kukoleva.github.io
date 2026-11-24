import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().default('✦'),
    order: z.number(),
  }),
})

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(), // slug категории, напр. 'chistka-lica'
      price: z.number(),
      priceNote: z.string().optional(),
      duration: z.string().optional(),
      shortDescription: z.string(), // для карточек и meta description
      description: z.string(), // основной текст (для schema.org Service)
      cover: image().optional(),
    }),
})

export const collections = { categories, services }