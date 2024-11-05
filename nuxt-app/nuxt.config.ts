export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
