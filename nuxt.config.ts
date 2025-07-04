export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["~/assets/css/index.css"],
  postcss: {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  }
  }
})
