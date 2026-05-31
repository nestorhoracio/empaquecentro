import { defineCollection, z } from 'astro:content';

const productos = defineCollection({
  type: 'content',
  schema: z.object({
    nombre:      z.string(),
    categoria:   z.string(),
    descripcion: z.string(),
    imagen:      z.string(),
    imagenAlt:   z.string().optional(),
    usos:        z.array(z.string()).default([]),
    mayorista:   z.boolean().default(false),
    orden:       z.number().default(99),
    activo:      z.boolean().default(true),
  }),
});

export const collections = { productos };
