import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.date(),
    excerpt: z.string().optional(),
  }),
});

export const collections = {
  en: blog,
  pl: blog,
};

