import { defineConfig } from 'astro/config';

// Sitio 100% estático. El único backend es el asistente Empaquecito, que vive como
// Netlify Function en netlify/functions/empaquecito.js — por eso no hace falta adaptador
// ni `output: 'hybrid'`.
export default defineConfig({
  site: 'https://centroempaque.netlify.app',
});
