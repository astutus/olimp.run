import { defineCollection, z } from 'astro:content'; // ✅ tu dodany z!

const blogSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional()
});

export const collections = {
  en: defineCollection({ schema: blogSchema }),
  pl: defineCollection({ schema: blogSchema }),
};

